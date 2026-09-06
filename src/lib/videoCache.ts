/**
 * Utility for multithreaded parallel video downloading and IndexedDB persistence.
 * Prevents re-downloading large videos (like main trailer.mp4) on subsequent visits.
 */

const DB_NAME = "YodhaMediaCacheDB";
const DB_VERSION = 1;
const STORE_NAME = "video_blobs";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined" || !window.indexedDB) {
      reject(new Error("IndexedDB not available"));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function getCachedVideoBlobUrl(key: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(key);
      req.onsuccess = () => {
        const result = req.result;
        if (result && result instanceof Blob) {
          const url = URL.createObjectURL(result);
          resolve(url);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn("IndexedDB read error:", err);
    return null;
  }
}

export async function saveVideoBlobToCache(key: string, blob: Blob): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(blob, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn("IndexedDB save error:", err);
  }
}

/**
 * Downloads a video using 4 parallel multi-threaded HTTP Range workers for maximum speed,
 * tracks combined progress, saves to IndexedDB, and returns a local Blob URL.
 */
export async function downloadMultithreadedVideo(
  videoUrl: string,
  cacheKey: string,
  onProgress: (pct: number) => void
): Promise<string> {
  // 1. Check IndexedDB cache first
  const existingUrl = await getCachedVideoBlobUrl(cacheKey);
  if (existingUrl) {
    onProgress(100);
    return existingUrl;
  }

  // 2. Fetch HEAD to get Content-Length & Accept-Ranges
  let contentLength = 0;
  let supportsRange = false;

  try {
    const headRes = await fetch(videoUrl, { method: "HEAD" });
    if (headRes.ok) {
      const len = headRes.headers.get("content-length");
      if (len) contentLength = parseInt(len, 10);
      const acceptRanges = headRes.headers.get("accept-ranges");
      if (acceptRanges === "bytes" || len) supportsRange = true;
    }
  } catch (err) {
    console.warn("HEAD request failed, falling back to single stream:", err);
  }

  // Fallback to single XHR stream if ranges aren't supported or length unknown
  if (!supportsRange || !contentLength || contentLength < 1000000) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("GET", videoUrl, true);
      xhr.responseType = "blob";
      xhr.onprogress = (e) => {
        if (e.lengthComputable && e.total > 0) {
          onProgress(Math.min(99, Math.round((e.loaded / e.total) * 100)));
        }
      };
      xhr.onload = async () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const blob = xhr.response;
          await saveVideoBlobToCache(cacheKey, blob);
          onProgress(100);
          resolve(URL.createObjectURL(blob));
        } else {
          reject(new Error(`Fetch failed status ${xhr.status}`));
        }
      };
      xhr.onerror = () => reject(new Error("XHR Network Error"));
      xhr.send();
    });
  }

  // 3. Multi-threaded Parallel Range Download (4 Threads)
  const THREAD_COUNT = 4;
  const chunkSize = Math.ceil(contentLength / THREAD_COUNT);
  const loadedArray = new Array(THREAD_COUNT).fill(0);

  const downloadChunk = async (index: number): Promise<ArrayBuffer> => {
    const start = index * chunkSize;
    const end = Math.min(contentLength - 1, (index + 1) * chunkSize - 1);

    const res = await fetch(videoUrl, {
      headers: { Range: `bytes=${start}-${end}` },
    });

    if (!res.ok && res.status !== 206) {
      throw new Error(`Chunk ${index} failed with status ${res.status}`);
    }

    const reader = res.body?.getReader();
    if (!reader) {
      const buf = await res.arrayBuffer();
      loadedArray[index] = buf.byteLength;
      updateTotalProgress();
      return buf;
    }

    const chunks: Uint8Array[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        received += value.byteLength;
        loadedArray[index] = received;
        updateTotalProgress();
      }
    }

    const combined = new Uint8Array(received);
    let offset = 0;
    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.length;
    }
    return combined.buffer;
  };

  const updateTotalProgress = () => {
    const totalLoaded = loadedArray.reduce((acc, curr) => acc + curr, 0);
    const pct = Math.min(99, Math.round((totalLoaded / contentLength) * 100));
    onProgress(pct);
  };

  try {
    const promises = Array.from({ length: THREAD_COUNT }, (_, i) => downloadChunk(i));
    const buffers = await Promise.all(promises);

    const finalBlob = new Blob(buffers, { type: "video/mp4" });
    await saveVideoBlobToCache(cacheKey, finalBlob);

    onProgress(100);
    return URL.createObjectURL(finalBlob);
  } catch (err) {
    console.warn("Multithread download failed, fallback to direct video URL:", err);
    onProgress(100);
    return videoUrl;
  }
}

// Utility helper to dynamically load problem statement images from src/assets/ps/
const psImagesGlob = import.meta.glob('/src/assets/ps/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const relativePsImagesGlob = import.meta.glob('../assets/ps/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

/**
 * Returns the resolved image URL for a problem statement ID (1 to 20).
 */
export function getProblemStatementImage(id: number): string {
  const absoluteKey = `/src/assets/ps/${id}.webp`;
  if (psImagesGlob[absoluteKey]) {
    return psImagesGlob[absoluteKey];
  }

  const relativeKey = `../assets/ps/${id}.webp`;
  if (relativePsImagesGlob[relativeKey]) {
    return relativePsImagesGlob[relativeKey];
  }

  // Fallback direct path for public/Vite server fallback
  return `/src/assets/ps/${id}.webp`;
}

/**
 * Preloaded map of problem statement images indexed by statement ID.
 */
export const PS_IMAGES_MAP: Record<number, string> = Array.from({ length: 20 }, (_, i) => i + 1).reduce(
  (acc, id) => {
    acc[id] = getProblemStatementImage(id);
    return acc;
  },
  {} as Record<number, string>
);

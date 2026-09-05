import ps1 from '../assets/ps/1.webp';
import ps2 from '../assets/ps/2.webp';
import ps3 from '../assets/ps/3.webp';
import ps4 from '../assets/ps/4.webp';
import ps5 from '../assets/ps/5.webp';
import ps6 from '../assets/ps/6.webp';
import ps7 from '../assets/ps/7.webp';
import ps8 from '../assets/ps/8.webp';
import ps9 from '../assets/ps/9.webp';
import ps10 from '../assets/ps/10.webp';
import ps11 from '../assets/ps/11.webp';
import ps12 from '../assets/ps/12.webp';
import ps13 from '../assets/ps/13.webp';
import ps14 from '../assets/ps/14.webp';
import ps15 from '../assets/ps/15.webp';
import ps16 from '../assets/ps/16.webp';

const getImageSrc = (img: any): string => (typeof img === 'string' ? img : img.src || img);

const psMap: Record<number, string> = {
  1: getImageSrc(ps1),
  2: getImageSrc(ps2),
  3: getImageSrc(ps3),
  4: getImageSrc(ps4),
  5: getImageSrc(ps5),
  6: getImageSrc(ps6),
  7: getImageSrc(ps7),
  8: getImageSrc(ps8),
  9: getImageSrc(ps9),
  10: getImageSrc(ps10),
  11: getImageSrc(ps11),
  12: getImageSrc(ps12),
  13: getImageSrc(ps13),
  14: getImageSrc(ps14),
  15: getImageSrc(ps15),
  16: getImageSrc(ps16),
};

export function getProblemStatementImage(id: number): string {
  return psMap[id] || `/src/assets/ps/${id}.webp`;
}

export const PS_IMAGES_MAP: Record<number, string> = psMap;


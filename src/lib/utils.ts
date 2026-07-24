import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function resolveImage(img: unknown): string {
  if (typeof img === 'string') return img;
  if (img && typeof img === 'object' && 'src' in img) return (img as { src: string }).src;
  return String(img);
}

export function srcSet(url: string, sizes: string[]): string {
  const ext = url.match(/\.(webp|png)$/)?.[0] || '.webp';
  return sizes.map(s => `${url.replace(new RegExp(`${ext}$`), `@${s}${ext}`)} ${s}`).join(', ');
}

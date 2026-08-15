export function srcSet(url: string, sizes: string[]): string {
  const ext = url.match(/\.(webp|png)$/)?.[0] || '.webp';
  return sizes.map(s => `${url.replace(new RegExp(`${ext}$`), `@${s}${ext}`)} ${s}`).join(', ');
}

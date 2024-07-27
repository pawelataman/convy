export function extractFileNameFromContentDisposition(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null;
  const matches = /filename="(.*?)"/g.exec(contentDisposition);
  return matches && matches.length > 1 ? matches[1] : null;
}

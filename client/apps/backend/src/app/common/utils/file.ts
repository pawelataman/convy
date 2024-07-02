export function normalizeFileName(fileName: string, fileExtension: string): string {
  const withNoExtension = fileName.includes('.') ? fileName.slice(0, fileName.lastIndexOf('.')) : fileName;
  return withNoExtension.concat('.').concat(fileExtension);
}

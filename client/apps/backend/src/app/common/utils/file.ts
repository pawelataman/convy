export function normalizeFileName(fileName: string, fileExtension: string): string {
  console.log('fileName', fileName);
  const withNoExtension = fileName.includes('.') ? fileName.slice(0, fileName.lastIndexOf('.')) : fileName;
  console.log('withNoExtension', withNoExtension);
  return withNoExtension.concat('.').concat(fileExtension);
}

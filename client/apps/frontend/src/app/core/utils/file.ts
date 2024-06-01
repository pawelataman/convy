export function extractFileFormat(file: File): string {
  return file.type.split('/')[1];
}

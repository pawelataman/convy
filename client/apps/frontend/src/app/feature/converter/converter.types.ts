export interface ConvertableFile {
  id: string;
  file: File;
  format: string;
  targetFormat?: string;
}

export interface ConvertedFile {
  name: string;
  file: Blob;
}

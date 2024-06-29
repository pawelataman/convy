export interface ConvertableFile {
  buffer: Buffer;
  metadata: {
    fileName: string;
    targetFormat: string;
  };
}

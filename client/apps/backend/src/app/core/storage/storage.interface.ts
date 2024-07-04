export interface FileStorage {
  putObject(fileName: string, buffer: Buffer): Promise<string>;

  // retrieveFile(fileName: string): Promise<Buffer>;
}

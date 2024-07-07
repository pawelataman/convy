import { StorageUploadInfo } from '../../domain/converter/types/storage-upload.type';

export interface FileStorage {
  putObject(storageUploadInfo: StorageUploadInfo, buffer: Buffer): Promise<string>;

  // retrieveFile(fileName: string): Promise<Buffer>;
}

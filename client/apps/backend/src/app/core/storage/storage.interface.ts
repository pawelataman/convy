import { StorageUploadInfo } from './storage-upload.type';
import { Readable } from 'stream';

export interface FileStorage {
  putObject(storageUploadInfo: StorageUploadInfo, buffer: Buffer): Promise<string>;

  retrieveFile(filePath: string): Promise<Readable>;
}

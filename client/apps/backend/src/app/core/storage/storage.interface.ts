import { Readable } from 'stream';
import { StorageUploadInfo } from './storage.types';

export interface FileStorage {
  putObject(storageUploadInfo: StorageUploadInfo, buffer: Buffer): Promise<string>;

  retrieveFile(filePath: string): Promise<Readable>;
}

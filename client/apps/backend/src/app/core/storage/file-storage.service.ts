import { MinioClient } from '@backend/core/storage/minio-client';
import { FileStorage } from '@backend/core/storage/storage.interface';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { StorageUploadInfo } from './storage-upload.type';

@Injectable()
export class FileStorageService implements FileStorage {
  constructor(private readonly minioClient: MinioClient) {}

  async putObject(storageUploadInfo: StorageUploadInfo, buffer: Buffer): Promise<string> {
    const filePath = this._getFilePath(storageUploadInfo);
    await this.minioClient.putObject(filePath, buffer);
    return filePath;
  }

  async retrieveFile(storageUploadInfo: StorageUploadInfo): Promise<Readable> {
    return this.minioClient.retrieveFile(this._getFilePath(storageUploadInfo));
  }

  private _getFilePath(storageUploadInfo: StorageUploadInfo): string {
    return `${storageUploadInfo.dirName}/${storageUploadInfo.fileName}`;
  }
}

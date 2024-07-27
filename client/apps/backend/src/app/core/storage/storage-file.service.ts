import { MinioClientService } from '@backend/src/app/core/storage/storage-minio-client.service';
import { FileStorage } from '@backend/src/app/core/storage/storage.interface';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { StorageUploadInfo } from './storage.types';

@Injectable()
export class StorageFileService implements FileStorage {
  constructor(private readonly minioClient: MinioClientService) {}

  async putObject(storageUploadInfo: StorageUploadInfo, buffer: Buffer): Promise<string> {
    const filePath = this._getFilePath(storageUploadInfo);
    await this.minioClient.putObject(filePath, buffer);
    return filePath;
  }

  async retrieveFile(filePath: string): Promise<Readable> {
    return this.minioClient.retrieveFile(filePath);
  }

  private _getFilePath(storageUploadInfo: StorageUploadInfo): string {
    return `${storageUploadInfo.dirName}/${storageUploadInfo.fileName}`;
  }
}

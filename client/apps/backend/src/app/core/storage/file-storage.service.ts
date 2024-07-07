import { MinioClient } from '@backend/core/storage/minio-client';
import { FileStorage } from '@backend/core/storage/storage.interface';
import { Injectable } from '@nestjs/common';
import { StorageUploadInfo } from '../../domain/converter/types/storage-upload.type';

@Injectable()
export class FileStorageService implements FileStorage {
  constructor(private readonly minioClient: MinioClient) {}

  async putObject(storageUploadInfo: StorageUploadInfo, buffer: Buffer): Promise<string> {
    const filePath = `${storageUploadInfo.dirName}/${storageUploadInfo.fileName}`;
    await this.minioClient.putObject(filePath, buffer);

    return filePath;
  }

  // retrieveFile(fileName: string): Promise<Buffer> {
  //
  // }
}

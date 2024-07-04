import { MinioClient } from '@backend/core/storage/minio-client';
import { FileStorage } from '@backend/core/storage/storage.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FileStorageService implements FileStorage {
  constructor(private readonly minioClient: MinioClient) {}

  putObject(fileName: string, buffer: Buffer): Promise<string> {
    return this.minioClient.putObject(fileName, buffer);
  }

  // retrieveFile(fileName: string): Promise<Buffer> {
  //
  // }
}

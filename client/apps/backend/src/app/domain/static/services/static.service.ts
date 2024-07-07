import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { StorageUploadInfo } from '@backend/core/storage/storage-upload.type';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';

@Injectable()
export class StaticService {
  constructor(private readonly storageService: FileStorageService) {}

  async getUploadedFile(storageUploadInfo: StorageUploadInfo): Promise<Readable> {
    return this.storageService.retrieveFile(storageUploadInfo);
  }
}

import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { Injectable } from '@nestjs/common';
import { Readable } from 'stream';
import { StorageUploadInfo } from '../../converter/types/storage-upload.type';

@Injectable()
export class StaticService {
  constructor(private readonly storageService: FileStorageService) {}

  async getUploadedFile(storageUploadInfo: StorageUploadInfo): Promise<Readable> {
    return this.storageService.retrieveFile(storageUploadInfo);
  }
}

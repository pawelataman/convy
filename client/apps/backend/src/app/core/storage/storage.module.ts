import { StorageFileService } from '@backend/core/storage/storage-file.service';
import { MinioClientService } from '@backend/core/storage/storage-minio-client.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MinioClientService, StorageFileService],
  exports: [StorageFileService],
})
export class StorageModule {}

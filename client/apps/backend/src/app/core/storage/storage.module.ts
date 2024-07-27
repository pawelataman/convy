import { StorageFileService } from '@backend/src/app/core/storage/storage-file.service';
import { MinioClientService } from '@backend/src/app/core/storage/storage-minio-client.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MinioClientService, StorageFileService],
  exports: [StorageFileService],
})
export class StorageModule {}

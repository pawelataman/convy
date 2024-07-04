import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { MinioClient } from '@backend/core/storage/minio-client';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [MinioClient, FileStorageService],
  exports: [FileStorageService],
})
export class CoreModule {}

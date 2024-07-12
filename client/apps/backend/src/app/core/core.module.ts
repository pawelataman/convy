import { DatabaseService } from '@backend/core/storage/database.service';
import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { MinioClient } from '@backend/core/storage/minio-client';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [MinioClient, FileStorageService, DatabaseService],
  exports: [FileStorageService, DatabaseService],
})
export class CoreModule {}

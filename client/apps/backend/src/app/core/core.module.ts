import { MinioClient } from '@backend/core/storage/minio-client';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [MinioClient],
  exports: [MinioClient],
})
export class CoreModule {}

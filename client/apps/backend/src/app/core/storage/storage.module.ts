import { DatabaseService } from '@backend/common/database/database.service';
import { SettingsRepository } from '@backend/core/settings/settings.repository';
import { SettingsService } from '@backend/core/settings/settings.service';
import { FileStorageService } from '@backend/core/storage/file-storage.service';
import { MinioClient } from '@backend/core/storage/minio-client';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [MinioClient, FileStorageService, DatabaseService, SettingsService, SettingsRepository],
  exports: [MinioClient, FileStorageService, DatabaseService, SettingsService, SettingsRepository],
})
export class CoreModule {}

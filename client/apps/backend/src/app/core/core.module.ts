import { CoreSettingsModule } from '@backend/core/settings/settings.module';
import { StorageModule } from '@backend/core/storage/storage.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CoreSettingsModule, StorageModule],
  exports: [StorageModule, CoreSettingsModule],
})
export class CoreModule {}

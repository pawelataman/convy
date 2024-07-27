import { CoreSettingsModule } from '@backend/src/app/core/settings/settings.module';
import { StorageModule } from '@backend/src/app/core/storage/storage.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [StorageModule, CoreSettingsModule],
  exports: [StorageModule, CoreSettingsModule],
})
export class CoreModule {}

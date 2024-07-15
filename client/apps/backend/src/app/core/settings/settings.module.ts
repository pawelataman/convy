import { SettingsRepository } from '@backend/core/settings/settings.repository';
import { SettingsService } from '@backend/core/settings/settings.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [SettingsRepository, SettingsService],
  exports: [SettingsRepository, SettingsService],
})
export class CoreSettingsModule {}

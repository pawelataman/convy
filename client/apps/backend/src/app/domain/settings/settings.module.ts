import { SettingsRepository } from '@backend/core/settings/settings.repository';
import { SettingsService } from '@backend/core/settings/settings.service';
import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [SettingsRepository, SettingsService],
})
export class SettingsModule {}

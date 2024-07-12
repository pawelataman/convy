import { SettingsRepository } from '@backend/domain/settings/settings.repository';
import { SettingsService } from '@backend/domain/settings/settings.service';
import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  providers: [SettingsRepository, SettingsService],
})
export class SettingsModule {}

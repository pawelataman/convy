import { CoreModule } from '@backend/src/app/core/core.module';
import { Module } from '@nestjs/common';
import { SettingsController } from './settings.controller';

@Module({
  controllers: [SettingsController],
  imports: [CoreModule],
})
export class SettingsModule {}

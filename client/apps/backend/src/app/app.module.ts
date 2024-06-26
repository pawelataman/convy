import { Module } from '@nestjs/common';
import { SettingsModule } from './domain/config/settings.module';
import { ConverterModule } from './domain/converter/converter.module';

@Module({
  imports: [SettingsModule, ConverterModule],
  providers: [],
})
export class AppModule {}

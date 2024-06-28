import { Module } from '@nestjs/common';
import { ConverterModule } from './domain/converter/converter.module';
import { SettingsModule } from './domain/settings/settings.module';

@Module({
  imports: [SettingsModule, ConverterModule],
  providers: [],
})
export class AppModule {}

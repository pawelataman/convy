import { CoreModule } from '@backend/core/core.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConverterModule } from './domain/converter/converter.module';
import { SettingsModule } from './domain/settings/settings.module';

@Module({
  imports: [SettingsModule, ConverterModule, CoreModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [],
})
export class AppModule {}

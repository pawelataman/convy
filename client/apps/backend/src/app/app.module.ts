import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';
import { ConverterModule } from './domain/converter/converter.module';
import { SettingsModule } from './domain/settings/settings.module';

@Module({
  imports: [SettingsModule, ConverterModule, ConfigModule.forRoot({ isGlobal: true }), CommonModule],
  providers: [],
})
export class AppModule {}

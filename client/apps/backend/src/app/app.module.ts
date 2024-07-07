import { CoreModule } from '@backend/core/core.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConverterModule } from './domain/converter/converter.module';
import { SettingsModule } from './domain/settings/settings.module';
import { StaticModule } from './domain/static/static.module';

@Module({
  imports: [SettingsModule, ConverterModule, CoreModule, ConfigModule.forRoot({ isGlobal: true }), StaticModule],
  providers: [],
})
export class AppModule {}

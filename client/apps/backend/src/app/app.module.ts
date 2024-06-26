import { Module } from '@nestjs/common';
import { ConfigModule } from './domain/config/config.module';
import { ConverterModule } from './domain/converter/converter.module';

@Module({
  imports: [ConfigModule, ConverterModule],
  providers: [],
})
export class AppModule {}

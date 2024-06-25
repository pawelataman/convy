import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { Module } from '@nestjs/common';
import { ConfigModule } from './domain/config/config.module';
import { ConverterModule } from './domain/converter/converter.module';

@Module({
  imports: [ConfigModule, ConverterModule, FastifyMulterModule],
  providers: [],
})
export class AppModule {}

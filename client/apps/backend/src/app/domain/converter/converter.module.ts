import { CONVERTER_MICROSERVICE_CONFIG } from '@backend/core/config/converter-microservice.config';
import { CONVERTER_PACKAGE_NAME } from '@backend/core/proto-types/converter_service';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConverterController } from './converter.controller';
import { ConverterService } from './services/converter.service';
import { ExternalConverterService } from './services/external-converter.service';
import { FileWriterService } from './services/file-writer.service';
import { InternalConverterService } from './services/internal-converter.service';

@Module({
  controllers: [ConverterController],
  imports: [ClientsModule.register([{ name: CONVERTER_PACKAGE_NAME, ...CONVERTER_MICROSERVICE_CONFIG }])],
  providers: [ConverterService, ExternalConverterService, InternalConverterService, FileWriterService],
})
export class ConverterModule {}

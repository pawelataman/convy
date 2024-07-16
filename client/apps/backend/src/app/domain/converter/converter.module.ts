import { CONVERTER_MICROSERVICE_CONFIG } from '@backend/common/config/converter-microservice.config';
import { CONVERTER_PACKAGE_NAME } from '@backend/common/proto-types/converter_service';
import { CoreModule } from '@backend/core/core.module';
import { ConverterRepository } from '@backend/domain/converter/services/converter.repository';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConverterController } from './converter.controller';
import { ConverterService } from './services/converter.service';
import { ExternalConverterService } from './services/external-converter.service';
import { FileWriterService } from './services/file-writer.service';
import { InternalConverterService } from './services/internal-converter.service';
import { SharpConverterService } from './services/sharp-converter.service';

@Module({
  controllers: [ConverterController],
  imports: [ClientsModule.register([{ name: CONVERTER_PACKAGE_NAME, ...CONVERTER_MICROSERVICE_CONFIG }]), CoreModule],
  providers: [ConverterService, ExternalConverterService, InternalConverterService, FileWriterService, SharpConverterService, ConverterRepository],
})
export class ConverterModule {}

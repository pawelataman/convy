import { CONVERTER_MICROSERVICE_CONFIG } from '@backend/core/config/converter-microservice.config';
import { CONVERTER_PACKAGE_NAME } from '@backend/core/proto-types/converter_service';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConverterController } from './converter.controller';
import { ConverterService } from './converter.service';

@Module({
  controllers: [ConverterController],
  imports: [ClientsModule.register([{ name: CONVERTER_PACKAGE_NAME, ...CONVERTER_MICROSERVICE_CONFIG }])],
  providers: [ConverterService],
})
export class ConverterModule {}

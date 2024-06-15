import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { Body, Controller, OnModuleInit, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, of } from 'rxjs';
import { CONVERTER_SERVICE_NAME, ConverterServiceClient } from '../core/proto-types/converter_service';
import { ConverterSvcOptions } from './converter-svc-options';
import { ConversionRequestMetadata } from './dto/convert-metadata';

@Controller('converter')
export class ConverterController implements OnModuleInit {
  @Client(ConverterSvcOptions) private readonly client: ClientGrpc;

  private converterService: ConverterServiceClient;

  onModuleInit(): void {
    this.converterService = this.client.getService<ConverterServiceClient>(CONVERTER_SERVICE_NAME);
  }

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async convertImage(@UploadedFile() file: File, @Body() metadata: ConversionRequestMetadata) {
    return firstValueFrom(
      this.converterService.upload(
        of({
          fileName: file.originalname,
          chunk: new Uint8Array(file.buffer),
        })
      )
    );
  }
}

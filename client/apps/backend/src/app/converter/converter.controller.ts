import { IConverterGatewayInterface } from '@global/api-interface/converter-gateway.interface';
import { FileInterceptor } from '@nest-lab/fastify-multer';
import { Body, Controller, Get, OnModuleInit, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ConverterSvcOptions } from './converter-svc-options';
import { ConvertMetadata } from './dto/convert-metadata';

export interface ConverterService {
  sayHello(request: { name: string }): Observable<{ message: string }>;
}

@Controller('converter')
export class ConverterController implements IConverterGatewayInterface, OnModuleInit {
  @Client(ConverterSvcOptions) private readonly client: ClientGrpc;
  private converterService: ConverterService;

  onModuleInit(): void {
    this.converterService = this.client.getService<ConverterService>('ConverterService');
  }

  @Post('convert')
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new ValidationPipe({ transform: true }))
  convertImage(@UploadedFile() file: File, @Body() metadata: ConvertMetadata) {
    console.log(file);
    console.log('target', metadata);
  }

  @Get('test-service')
  testService(): void {
    const request = {
      name: 'Hello from NestJs Client',
    };

    this.converterService.sayHello(request).subscribe((response) => {
      console.log(response.message);
    });
  }
}

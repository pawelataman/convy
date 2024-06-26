import { File, FileInterceptor } from '@nest-lab/fastify-multer';
import { Body, Controller, OnModuleInit, Post, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { Readable } from 'stream';
import { FileUploadRequest, FileUploadResponse } from '../../core/proto-types/converter_messages';
import { CONVERTER_SERVICE_NAME, ConverterServiceClient } from '../../core/proto-types/converter_service';
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
  async convertImage(@UploadedFile() file: File, @Body() metadata: ConversionRequestMetadata): Promise<FileUploadResponse> {
    console.log(metadata);

    const fileStream = bufferToStream(file.buffer);

    const fileStreamObservable = new Observable<FileUploadRequest>((observer) => {
      fileStream.on('data', (chunk) => {
        observer.next({
          chunk: chunk,
          fileName: file.originalname,
        });
      });

      fileStream.once('end', () => observer.complete());
    });
    return firstValueFrom(this.converterService.upload(fileStreamObservable));
  }
}

function bufferToStream(buffer): Readable {
  // Create a readable stream from the buffer
  const stream = new Readable({ highWaterMark: 128 });
  // Push the buffer to the stream
  stream.push(buffer);
  // Signal the end of the stream
  stream.push(null);
  return stream;
}

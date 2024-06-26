import { splitBuffer } from '@backend/common/utils/split-buffer';
import { FileUploadRequest } from '@backend/core/proto-types/converter_messages';
import { CONVERTER_PACKAGE_NAME, CONVERTER_SERVICE_NAME, ConverterServiceClient } from '@backend/core/proto-types/converter_service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ConversionRequestMetadata } from './dto/convert-metadata';

@Injectable()
export class ConverterService {
  private converterMicroserviceGateway: ConverterServiceClient;

  constructor(@Inject(CONVERTER_PACKAGE_NAME) private readonly client: ClientGrpc) {
    this.converterMicroserviceGateway = this.client.getService<ConverterServiceClient>(CONVERTER_SERVICE_NAME);
  }

  upload(file: Express.Multer.File, metadata: ConversionRequestMetadata) {
    const chunks = splitBuffer(file.buffer);
    const fileStream$ = new Observable<FileUploadRequest>((observer) => {
      chunks.forEach((chunk) =>
        observer.next({
          fileName: metadata.fileName,
          chunk,
        })
      );

      observer.complete();
    });

    return this.converterMicroserviceGateway.upload(fileStream$);
  }
}

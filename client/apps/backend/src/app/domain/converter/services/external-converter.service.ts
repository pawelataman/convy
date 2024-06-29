import { splitBuffer } from '@backend/common/utils/split-buffer';
import { FileUploadRequest } from '@backend/core/proto-types/converter_messages';
import { CONVERTER_PACKAGE_NAME, CONVERTER_SERVICE_NAME, ConverterServiceClient } from '@backend/core/proto-types/converter_service';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import { IConverter } from '../interfaces/converter.interface';
import { ConvertableFile } from '../types/convertable-file.type';
import { FileWriterService } from './file-writer.service';

@Injectable()
export class ExternalConverterService implements IConverter {
  private converterMicroserviceGateway: ConverterServiceClient;

  constructor(@Inject(CONVERTER_PACKAGE_NAME) private readonly client: ClientGrpc, private readonly fileWriterService: FileWriterService) {
    this.converterMicroserviceGateway = this.client.getService<ConverterServiceClient>(CONVERTER_SERVICE_NAME);
  }

  convert(convertable: ConvertableFile): Promise<string> {
    return this.fileWriterService.writeStreamToFile(
      this.converterMicroserviceGateway.upload(this._createOutgoingStream(convertable)).pipe(map((data) => data.chunk)),
      convertable.metadata.fileName,
      convertable.metadata.targetFormat
    );
  }

  private _createOutgoingStream(convertable: ConvertableFile): Observable<FileUploadRequest> {
    const chunks = splitBuffer(convertable.buffer);

    return new Observable<FileUploadRequest>((observer) => {
      chunks.forEach((chunk) =>
        observer.next({
          fileName: convertable.metadata.fileName,
          targetFormat: convertable.metadata.targetFormat,
          chunk,
        })
      );
      observer.complete();
    });
  }
}

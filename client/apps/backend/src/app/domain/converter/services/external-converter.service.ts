import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalConverterService {
  //implements IConverter {
  // private converterMicroserviceGateway: ConverterServiceClient;
  //
  // constructor(@Inject(CONVERTER_PACKAGE_NAME) private readonly client: ClientGrpc, private readonly fileWriterService: FileWriterService) {
  //   this.converterMicroserviceGateway = this.client.getService<ConverterServiceClient>(CONVERTER_SERVICE_NAME);
  // }
  //
  // convert(convertable: ConvertableFile): Promise<string> {
  //   return this.fileWriterService.writeStreamToFile(
  //     this.converterMicroserviceGateway.upload(this._createOutgoingStream(convertable)).pipe(map((data) => data.chunk)),
  //     convertable.metadata.fileName,
  //     convertable.metadata.
  //   );
  // }
  //
  // private _createOutgoingStream(convertable: ConvertableFile): Observable<FileUploadRequest> {
  //   const chunks = splitBuffer(convertable.buffer);
  //
  //   return new Observable<FileUploadRequest>((observer) => {
  //     chunks.forEach((chunk) =>
  //       observer.next({
  //         fileName: convertable.metadata.fileName,
  //         targetFormat: convertable.metadata.targetFormat,
  //         chunk,
  //       })
  //     );
  //     observer.complete();
  //   });
  // }
}

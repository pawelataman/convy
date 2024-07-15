import { Injectable } from '@angular/core';
import { ConversionRequestMetadata } from '@libs/api-interface/types/conversion-request-metadata';
import { ConversionResponseMetadata } from '@libs/api-interface/types/conversion-response-metadata';
import { FileType } from '@libs/api-interface/types/file-type';
import { generateUuid } from '@libs/utils/guid';
import { Observable } from 'rxjs';
import { ConverterApiService } from './converter-api.service';

@Injectable()
export class ConverterService {
  constructor(private readonly _converterApiService: ConverterApiService) {}

  convertImage(file: File, targetFormat: FileType): Observable<ConversionResponseMetadata> {
    const metadata: ConversionRequestMetadata = {
      requestId: `${generateUuid()}-${new Date().getTime()}-${file.name}`.split(' ').join('-'),
      targetFormatId: targetFormat.id,
    };
    return this._converterApiService.convertImage(file, metadata);
  }

  downloadImage(downloadUrl: string) {
    return this._converterApiService.downloadImage(downloadUrl);
  }
}

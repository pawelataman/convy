import { Injectable } from '@angular/core';
import { ConvertedFile } from '@frontend/src/app/feature/converter/converter.types';
import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { generateUuid } from '@libs/utils/guid';
import { Observable, Subject } from 'rxjs';
import { ConverterApiService } from './converter-api.service';

@Injectable()
export class ConverterService {
  events$ = {
    convertEvent: new Subject<void>(),
  };

  constructor(private readonly _converterApiService: ConverterApiService) {}

  convertImage(file: File, targetFormat: ApiFileType): Observable<ApiConversionResponseMetadata> {
    const metadata: ApiConversionRequestMetadata = {
      requestId: `${generateUuid()}-${new Date().getTime()}-${file.name}`.split(' ').join('-'),
      targetFormatId: targetFormat.id,
    };
    return this._converterApiService.convert(file, metadata);
  }

  downloadImage(conversionId: string): Observable<ConvertedFile> {
    return this._converterApiService.getConvertedImage(conversionId);
  }
}

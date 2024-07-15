import { Injectable } from '@angular/core';
import { ConversionRequestMetadata } from '@libs/api-interface/types/conversion-request-metadata';
import { ConversionResponseMetadata } from '@libs/api-interface/types/conversion-response-metadata';
import { generateUuid } from '@libs/utils/guid';
import { delay, Observable } from 'rxjs';
import { ConverterApiService } from './converter-api.service';

@Injectable()
export class ConverterService {
  constructor(private readonly _converterApiService: ConverterApiService) {}

  convertImage(file: File): Observable<ConversionResponseMetadata> {
    const metadata: ConversionRequestMetadata = {
      requestId: `${generateUuid()}-${new Date().getTime()}-${file.name}`.split(' ').join('-'),
      targetFormat: 'png',
    };
    return this._converterApiService.convertImage(file, metadata).pipe(delay(2000));
  }
}

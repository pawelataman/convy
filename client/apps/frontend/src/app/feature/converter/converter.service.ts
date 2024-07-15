import { Injectable } from '@angular/core';
import { ConversionRequestMetadata, ConversionResponseMetadata } from '@libs/api-interface/api-response.interface';
import { generateUuid } from '@libs/utils/guid';
import { Observable, delay } from 'rxjs';
import { ConverterApiService } from './converter-api.service';

@Injectable()
export class ConverterService {
  constructor(private readonly _converterApiService: ConverterApiService) {}

  convertImage(file: File): Observable<ConversionResponseMetadata> {
    const metadata: ConversionRequestMetadata = {
      fileName: file.name,
      requestId: `${generateUuid()}-${new Date().getTime()}-${file.name}`.split(' ').join('-'),
      targetFormat: 'png',
      sourceFormat: 'png',
    };
    return this._converterApiService.convertImage(file, metadata).pipe(delay(2000));
  }
}

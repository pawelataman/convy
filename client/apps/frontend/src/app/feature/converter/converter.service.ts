import { Injectable } from '@angular/core';
import { generateUuid } from '@global/utils/guid';
import { delay, Observable, of } from 'rxjs';
import { ConverterApiService } from './converter-api.service';
import { ConversionRequestMetadata, ConversionResult } from './converter.types';

@Injectable()
export class ConverterService {
  constructor(private readonly _converterApiService: ConverterApiService) {}

  convertImage(file: File): Observable<ConversionResult> {
    const metadata: ConversionRequestMetadata = {
      fileName: file.name,
      requestId: `${generateUuid()}-${new Date().getTime()}-${file.name}`.split(' ').join('-'),
      targetFormat: 'png',
      sourceFormat: 'png',
    };
    return of<ConversionResult>({
      fileName: metadata.fileName,
      requestId: metadata.requestId,
      url: 'https://img.freepik.com/premium-photo/beautiful-background-photo-very-nice-photo-se-different-food-photo-different-colorful-scenery_1028782-252259.jpg',
    }).pipe(delay(1500));
    // return this._converterApiService.convertImage(file, metadata).pipe(delay(2000));
  }
}

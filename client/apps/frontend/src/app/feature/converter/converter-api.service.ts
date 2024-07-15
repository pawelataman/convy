import { Injectable } from '@angular/core';
import { ConversionRequestMetadata, ConversionResponseMetadata } from '@libs/api-interface/api-response.interface';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../core/api/base-api.service';
import { environments } from '../../environments/environments';

@Injectable()
export class ConverterApiService {
  private readonly _url = `${environments.API_URL}/converter/convert`;

  constructor(private readonly _baseApiService: BaseApiService) {}

  convertImage(file: Blob, metadata: ConversionRequestMetadata): Observable<ConversionResponseMetadata> {
    return this._baseApiService.convert(file, metadata);
  }
}

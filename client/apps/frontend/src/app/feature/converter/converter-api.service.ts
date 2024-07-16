import { Injectable } from '@angular/core';
import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../core/api/base-api.service';
import { environments } from '../../environments/environments';

@Injectable()
export class ConverterApiService {
  private readonly _url = `${environments.API_URL}/converter/convert`;

  constructor(private readonly _baseApiService: BaseApiService) {}

  convertImage(file: Blob, metadata: ApiConversionRequestMetadata): Observable<ApiConversionResponseMetadata> {
    return this._baseApiService.convert(file, metadata);
  }

  downloadImage(downloadUrl: string) {
    return this._baseApiService.downloadImage(downloadUrl);
  }
}

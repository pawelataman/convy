import { Injectable } from '@angular/core';
import { ConversionRequestMetadata } from '@libs/api-interface/types/conversion-request-metadata';
import { ConversionResponseMetadata } from '@libs/api-interface/types/conversion-response-metadata';
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

  downloadImage(downloadUrl: string) {
    return this._baseApiService.downloadImage(downloadUrl);
  }
}

import { Injectable } from '@angular/core';
import { BaseApiService } from '@frontend/src/app/core/api/base-api.service';
import { IConverterGateway } from '@libs/api/converter-gateway.interface';
import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { Observable } from 'rxjs';

@Injectable()
export class ConverterApiService extends BaseApiService implements IConverterGateway {
  constructor() {
    super('converter');
  }

  getConvertedImage(conversionId: string): Observable<any> {
    return this._http.get(`${this._url}/conversion/${conversionId}`, { responseType: 'blob' });
  }

  convert(file: Blob, metadata: ApiConversionRequestMetadata): Observable<ApiConversionResponseMetadata> {
    const formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    formData.append('requestId', metadata.requestId);
    formData.append('targetFormatId', `${metadata.targetFormatId}`);

    return this._http.post<ApiConversionResponseMetadata>(`${this._url}/convert`, formData);
  }
}

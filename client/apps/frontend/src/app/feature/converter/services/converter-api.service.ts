import { Injectable } from '@angular/core';
import { BaseApiService } from '@frontend/src/app/core/api/base-api.service';
import { extractFileNameFromContentDisposition } from '@frontend/src/app/core/utils/http';
import { ConvertedFile } from '@frontend/src/app/feature/converter/converter.types';
import { IConverterGateway } from '@libs/api/converter-gateway.interface';
import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConverterApiService extends BaseApiService implements IConverterGateway {
  constructor() {
    super('converter');
  }

  getConvertedImage(conversionId: string): Observable<ConvertedFile> {
    return this._http
      .get(`${this._url}/conversion/${conversionId}`, {
        observe: 'response',
        responseType: 'blob',
      })
      .pipe(
        map((response) => {
          const contentDisposition = extractFileNameFromContentDisposition(response.headers.get('Content-Disposition'));
          const fileBlob = response.body;

          if (!fileBlob) throw new Error('File not present');
          if (!contentDisposition) throw new Error('Unknown content');

          return {
            file: fileBlob,
            name: contentDisposition,
          };
        })
      );
  }

  convert(file: Blob, metadata: ApiConversionRequestMetadata): Observable<ApiConversionResponseMetadata> {
    const formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    formData.append('requestId', metadata.requestId);
    formData.append('targetFormatId', `${metadata.targetFormatId}`);

    return this._http.post<ApiConversionResponseMetadata>(`${this._url}/convert`, formData);
  }
}

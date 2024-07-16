import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IConverterGatewayInterface } from '@libs/api/converter-gateway.interface';
import { ApiConversionRequestMetadata } from '@libs/api/types/api-conversion-request-metadata';
import { ApiConversionResponseMetadata } from '@libs/api/types/api-conversion-response-metadata';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class BaseApiService implements IConverterGatewayInterface {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _url = environments.API_URL;

  getFormatsForFileType(fileTypeId: number): Observable<ApiFileType[]> {
    return this._http.get<ApiFileType[]>(`${this._url}/${fileTypeId}`);
  }

  getSettings(): Observable<ApiGetSettingsResponse> {
    return this._http.get<ApiGetSettingsResponse>(`${this._url}/settings`);
  }

  convert(file: Blob, metadata: ApiConversionRequestMetadata): Observable<ApiConversionResponseMetadata> {
    const formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    formData.append('requestId', metadata.requestId);
    formData.append('targetFormat', `${metadata.targetFormatId}`);

    return this._http.post<ApiConversionResponseMetadata>(`${this._url}/converter/convert`, formData);
  }

  downloadImage(downloadUrl: string) {
    return this._http.get(`${this._url}/${downloadUrl}`);
  }
}

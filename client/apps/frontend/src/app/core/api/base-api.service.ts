import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IConverterGatewayInterface } from '@libs/api-interface/converter-gateway.interface';
import { ConversionRequestMetadata } from '@libs/api-interface/types/conversion-request-metadata';
import { ConversionResponseMetadata } from '@libs/api-interface/types/conversion-response-metadata';
import { FileType } from '@libs/api-interface/types/file-type';
import { GetSettingsResponse } from '@libs/api-interface/types/get-settings-response';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';

@Injectable({ providedIn: 'root' })
export class BaseApiService implements IConverterGatewayInterface {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _url = environments.API_URL;

  getFormatsForFileType(fileTypeId: number): Observable<FileType[]> {
    return this._http.get<FileType[]>(`${this._url}/${fileTypeId}`);
  }

  getSettings(): Observable<GetSettingsResponse> {
    return this._http.get<GetSettingsResponse>(`${this._url}/settings`);
  }

  convert(file: Blob, metadata: ConversionRequestMetadata): Observable<ConversionResponseMetadata> {
    const formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    formData.append('requestId', metadata.requestId);
    formData.append('targetFormat', metadata.targetFormat);

    return this._http.post<ConversionResponseMetadata>(`${this._url}/converter/convert`, formData);
  }
}

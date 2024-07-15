import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ConversionRequestMetadata, ConversionResponseMetadata, FileType, GetSettingsResponse } from '@libs/api-interface/api-response.interface';
import { IConverterGatewayInterface } from '@libs/api-interface/converter-gateway.interface';
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
    formData.append('fileName', metadata.fileName);
    formData.append('requestId', metadata.requestId);
    formData.append('sourceFormat', metadata.sourceFormat);
    formData.append('targetFormat', metadata.targetFormat);

    return this._http.post<ConversionResponseMetadata>(`${this._url}/converter/convert`, formData);
  }
}

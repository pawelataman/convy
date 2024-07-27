import { Injectable } from '@angular/core';
import { BaseApiService } from '@frontend/src/app/core/api/base-api.service';
import { ISettingsGateway } from '@libs/api/settings-gateway.interface';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SettingsApiService extends BaseApiService implements ISettingsGateway {
  constructor() {
    super('settings');
  }

  getSettings(): Observable<ApiGetSettingsResponse> {
    return this._http.get<ApiGetSettingsResponse>(this._url);
  }

  getFormatsForFileType(fileTypeId: number): Observable<ApiFileType[]> {
    return this._http.get<ApiFileType[]>(`${this._url}/formats/${fileTypeId}`);
  }
}

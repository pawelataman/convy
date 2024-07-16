import { Injectable } from '@angular/core';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  constructor(private readonly _baseApiService: BaseApiService) {}

  getAppSettings(): Observable<ApiGetSettingsResponse> {
    return this._baseApiService.getSettings();
  }
}

import { Injectable } from '@angular/core';
import { GetSettingsResponse } from '@libs/api-interface/api-response.interface';
import { Observable } from 'rxjs';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService {
  constructor(private readonly _baseApiService: BaseApiService) {}

  getAppSettings(): Observable<GetSettingsResponse> {
    return this._baseApiService.getSettings();
  }
}

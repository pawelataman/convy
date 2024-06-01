import { Injectable } from '@angular/core';
import { GetConfigResponse } from '@global/api-interface/api-response.interface';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService extends BaseApiService {
  private readonly _url = `${environments.API_URL}/config`;

  getAppConfig(): Observable<GetConfigResponse> {
    return this.http.get<GetConfigResponse>(this._url);
  }
}

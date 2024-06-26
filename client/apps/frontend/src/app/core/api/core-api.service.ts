import { Injectable } from '@angular/core';
import { GetConfigResponse } from '@libs/api-interface/api-response.interface';
import { Observable, of } from 'rxjs';
import { environments } from '../../environments/environments';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService extends BaseApiService {
  private readonly _url = `${environments.API_URL}/config`;

  constructor() {
    super();
  }

  getAppConfig(): Observable<GetConfigResponse> {
    return of({ sourceFormats: ['png'], targetFormats: ['png'] });
    //return this.http.get<GetConfigResponse>(this._url);
  }
}

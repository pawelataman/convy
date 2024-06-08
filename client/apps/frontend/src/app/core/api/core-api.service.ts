import { Injectable } from '@angular/core';
import { GetConfigResponse } from '@global/api-interface/api-response.interface';
import { Observable, of } from 'rxjs';
import { environments } from '../../environments/environments';
import { BaseApiService } from './base-api.service';

@Injectable({
  providedIn: 'root',
})
export class CoreApiService extends BaseApiService {
  constructor() {
    super();
  }
  private readonly _url = `${environments.API_URL}/config`;

  getAppConfig(): Observable<GetConfigResponse> {
    return of({sourceFormats: ['png'], targetFormats: ['png']});
    //return this.http.get<GetConfigResponse>(this._url);
  }
}

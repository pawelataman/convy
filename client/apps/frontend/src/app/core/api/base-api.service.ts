import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { environments } from '@frontend/src/app/environments/environments';

export class BaseApiService {
  protected readonly _http: HttpClient = inject(HttpClient);
  protected readonly _url: string;

  constructor(endpoint: string) {
    this._url = `${environments.API_URL}/${endpoint}`;
  }
}

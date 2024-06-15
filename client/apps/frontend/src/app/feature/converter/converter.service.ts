import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../core/api/base-api.service';
import { environments } from '../../environments/environments';

@Injectable()
export class ConverterService extends BaseApiService {
  private readonly _url = `${environments.API_URL}/converter/convert`;

  constructor() {
    super();
  }

  convertImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    return this.http.post(this._url, formData);
  }
}

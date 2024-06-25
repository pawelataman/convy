import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../core/api/base-api.service';
import { environments } from '../../environments/environments';
import { ConversionRequestMetadata } from './converter.types';

@Injectable()
export class ConverterApiService extends BaseApiService {
  private readonly _url = `${environments.API_URL}/converter/convert`;

  constructor() {
    super();
  }

  convertImage(file: File, metadata: ConversionRequestMetadata): Observable<any> {
    const formData = new FormData();
    formData.append('file', new Blob([file]), file.name);
    formData.append('fileName', metadata.fileName);
    formData.append('requestId', metadata.requestId);
    formData.append('sourceFormat', metadata.sourceFormat);
    formData.append('targetFormat', metadata.targetFormat);
    return this.http.post(this._url, formData);
  }
}

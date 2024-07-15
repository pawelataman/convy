import { Injectable } from '@angular/core';
import { FileType } from '@libs/api-interface/api-response.interface';
import { AppConfig } from '../types/app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _appConfig: AppConfig = {
    supportedFileTypes: [],
  };

  set appConfig(appConfig: AppConfig) {
    this._appConfig = appConfig;
  }

  get supportedFileTypes(): FileType[] {
    return this._appConfig.supportedFileTypes;
  }
}

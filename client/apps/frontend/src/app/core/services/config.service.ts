import { Injectable } from '@angular/core';
import { ApiFileType } from '@libs/api/types/api-file-type';
import { AppConfig } from '../types/app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _appConfig: AppConfig = {
    supportedFileTypes: [],
    fileTypesConvertableTo: {},
  };

  set appConfig(appConfig: AppConfig) {
    this._appConfig = appConfig;
  }

  get supportedFileTypes(): ApiFileType[] {
    return this._appConfig.supportedFileTypes;
  }

  get fileTypesConvertableTo(): { [id: number]: ApiFileType[] } {
    return this._appConfig.fileTypesConvertableTo;
  }
}

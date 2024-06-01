import { Injectable } from '@angular/core';
import { AppConfig } from '../types/app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private _appConfig: AppConfig = {
    sourceFormats: [],
    targetFormats: [],
  };

  set appConfig(appConfig: AppConfig) {
    this._appConfig = appConfig;
  }

  get supportedSourceFileFormats(): string[] {
    return this._appConfig.sourceFormats;
  }

  get supportedTargetFileFormats(): string[] {
    return this._appConfig.targetFormats;
  }
}

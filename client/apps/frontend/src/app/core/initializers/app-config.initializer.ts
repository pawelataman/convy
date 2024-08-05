import { APP_INITIALIZER } from '@angular/core';
import { SettingsApiService } from '@frontend/src/app/core/api/settings-api.service';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { tap } from 'rxjs';
import { ConfigService } from '../services/config.service';

export function initializeAppConfig(apiService: SettingsApiService, configService: ConfigService) {
  return () =>
    apiService.getSettings().pipe(
      tap((config: ApiGetSettingsResponse) => {
        configService.appConfig = {
          supportedFileTypes: config.supportedFileTypes,
          fileTypesConvertableTo: config.fileTypesConvertableTo,
        };
      })
    );
}

export const APP_CONFIG_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppConfig,
  multi: true,
  deps: [SettingsApiService, ConfigService],
};

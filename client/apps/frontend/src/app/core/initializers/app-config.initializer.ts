import { APP_INITIALIZER } from '@angular/core';
import { ApiGetSettingsResponse } from '@libs/api/types/api-get-settings-response';
import { tap } from 'rxjs';
import { CoreApiService } from '../api/core-api.service';
import { ConfigService } from '../services/config.service';

export function initializeAppConfig(apiService: CoreApiService, configService: ConfigService) {
  return () =>
    apiService.getAppSettings().pipe(
      tap((config: ApiGetSettingsResponse) => {
        configService.appConfig = {
          supportedFileTypes: config.supportedFileTypes,
        };
      })
    );
}

export const APP_CONFIG_INITIALIZER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppConfig,
  multi: true,
  deps: [CoreApiService, ConfigService],
};

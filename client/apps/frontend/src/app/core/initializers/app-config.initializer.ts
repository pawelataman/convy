import { APP_INITIALIZER } from '@angular/core';
import { GetSettingsResponse } from '@libs/api-interface/api-response.interface';
import { tap } from 'rxjs';
import { CoreApiService } from '../api/core-api.service';
import { ConfigService } from '../services/config.service';

export function initializeAppConfig(apiService: CoreApiService, configService: ConfigService) {
  return () =>
    apiService.getAppConfig().pipe(
      tap((config: GetSettingsResponse) => {
        configService.appConfig = {
          sourceFormats: config.sourceFormats,
          targetFormats: config.targetFormats,
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

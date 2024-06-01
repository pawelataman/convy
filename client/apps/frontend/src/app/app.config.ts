import { ApplicationConfig } from '@angular/core';
import { appRoutes } from './app.routes';
import { provideCore } from './core/core';
import { APP_CONFIG_INITIALIZER } from './core/initializers/app-config.initializer';

export const appConfig: ApplicationConfig = {
  providers: [provideCore({ routes: appRoutes }), APP_CONFIG_INITIALIZER],
};

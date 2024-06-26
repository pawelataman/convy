import { provideHttpClient, withFetch } from '@angular/common/http';
import { EnvironmentProviders } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  Routes,
  provideRouter,
  withComponentInputBinding,
  withEnabledBlockingInitialNavigation,
  withRouterConfig,
} from '@angular/router';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore(coreOptions: CoreOptions): EnvironmentProviders[] {
  return [
    // provideExperimentalZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideRouter(
      coreOptions.routes,
      withRouterConfig({
        onSameUrlNavigation: 'reload',
      }),
      withComponentInputBinding(),
      withEnabledBlockingInitialNavigation()
    ),
  ];
}

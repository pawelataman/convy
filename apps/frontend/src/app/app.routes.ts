import { Route } from '@angular/router';
import { GlobalRoutePaths } from './core/types/global-paths';

export const appRoutes: Route[] = [
  {
    path: GlobalRoutePaths.home,
    loadComponent: () =>
      import('./feature/landing-page/landing-page.component').then((c) => c.LandingPageComponent),
  },
  {
    path: GlobalRoutePaths.converter,
    loadChildren: () => import('./feature/converter/converter.routes').then((r) => r.routes),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: GlobalRoutePaths.home,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: GlobalRoutePaths.home,
  },
];

import { Route } from '@angular/router';
import { GlobalRoutePaths } from './core/types/global-paths';

export const appRoutes: Route[] = [
  {
    path: GlobalRoutePaths.converter,
    loadComponent: () => import('./feature/converter/converter.component').then((r) => r.ConverterComponent),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: GlobalRoutePaths.converter,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: GlobalRoutePaths.converter,
  },
];

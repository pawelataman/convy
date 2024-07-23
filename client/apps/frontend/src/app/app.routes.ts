import { Route } from '@angular/router';
import { GlobalRoutePaths } from './core/types/global-paths';

export const appRoutes: Route[] = [
  {
    path: GlobalRoutePaths.converter,
    loadChildren: () => import('./feature/converter/converter.routes').then((r) => r.routes),
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

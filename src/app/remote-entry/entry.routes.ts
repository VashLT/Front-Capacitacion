import { Routes } from '@angular/router';
import { AuthGuard } from '@UIS-common/layout/core/authentication/auth.guard';
import { RoutesLayout } from '@UIS-common/layout/shared/utils/routes';
import { RemoteEntryComponent } from './entry.component';

export const routes: Routes = [
  {
    path: '',
    component: RemoteEntryComponent,
    children: [
      {
        path: '',
        redirectTo: 'hoja-vida',
        pathMatch: 'full',
      },
      {
        path: 'hoja-vida',
        canLoad: [AuthGuard],
        loadChildren: () =>
          import('../recursos-humanos/hoja-vida/hoja-vida.module').then(
            (m) => m.HojaVidaModule
          ),
      },
      ...RoutesLayout,
    ],
  },
];

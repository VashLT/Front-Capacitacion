import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';
import { RoutesLayout } from '@UIS-common/layout/shared/utils/routes';
import { AuthGuard } from './UIS-common/layout/core/authentication/auth.guard';

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 64],
};
const routes: Routes = [
  {
    path: '',
    redirectTo: '/capacitacion',
    pathMatch: 'full',
  },
  {
    path: 'capacitacion',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./capacitacion/capacitacion.module').then(
        (m) => m.CapacitacionModule
      ),
  },
  ...RoutesLayout,
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

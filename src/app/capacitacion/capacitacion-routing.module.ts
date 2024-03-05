import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuard } from '@UIS-common/layout/core/authentication/routes/route-guard.guard';
import { RoutingOverridePipe } from 'src/app/remote-entry/pipes/routing-override.pipe';
import { RoutesService } from '@UIS-common/layout/core/authentication/routes/routes.service';
import { UisLayoutComponent } from '@UIS-common/layout/app-layout/uis-layout.component';
import { TestComponent } from './test/test.component';
import { PortadaComponent } from './portada/portada.component';

const routes: Routes = [
  {
    path: '',
    component: UisLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/capacitacion/portada',
        pathMatch: 'full',
      },
      {
        path: 'portada',
        component: PortadaComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
      // {
      //   path: 'autoservicio/informacion-basica',
      //   loadChildren: () =>
      //     import(
      //       './mi-historia-laboral/informacion-basica/informacion-basica.module'
      //     ).then((m) => m.InformacionBasicaModule),
      // },
    ],
    canActivateChild: [RouteGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule, FormsModule],
  providers: [RoutingOverridePipe, RoutesService, RouteGuard],
})
export class AdminRoutingModule {}

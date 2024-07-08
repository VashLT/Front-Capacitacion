import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { RouteGuard } from '@UIS-common/layout/core/authentication/routes/route-guard.guard';
import { RoutingOverridePipe } from 'src/app/remote-entry/pipes/routing-override.pipe';
import { RoutesService } from '@UIS-common/layout/core/authentication/routes/routes.service';
import { UisLayoutComponent } from '@UIS-common/layout/app-layout/uis-layout.component';
import { PortadaComponent } from './portada/portada.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ObservablesComponent } from './observables/observables.component';
import { ListaTareasComponent } from './lista-tareas/lista-tareas.component';
import { FormulariosComponent } from './formularios/formularios.component';
import { CrudComponent } from './crud/crud.component';

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
        path: 'calculator',
        component: CalculatorComponent
      },
      {
        path: 'observables',
        component: ObservablesComponent
      },
      {
        path: 'lista-tareas',
        component: ListaTareasComponent
      },
      {
        path: 'formularios',
        component: FormulariosComponent
      },
      {
        path: 'crud',
        component: CrudComponent
      }
    ],
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes), FormsModule],
  exports: [RouterModule, FormsModule],
  providers: [RoutingOverridePipe, RoutesService, RouteGuard],
})
export class AdminRoutingModule { }

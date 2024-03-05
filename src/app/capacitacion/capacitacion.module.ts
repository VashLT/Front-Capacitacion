import { NgModule } from '@angular/core';
import { IMaskPipe } from 'angular-imask';
import { CommonModule } from '@angular/common';
import { MATERIAL_PROVIDERS } from 'src/app/material/providers';
import { RoutingOverridePipe } from 'src/app/remote-entry/pipes/routing-override.pipe';
import { AdminRoutingModule } from './capacitacion-routing.module';
import { IMPORTS_CAPACITACION } from './imports.module';

@NgModule({
  declarations: [...IMPORTS_CAPACITACION.components],
  imports: [
    CommonModule,
    AdminRoutingModule,
    RoutingOverridePipe,
    ...IMPORTS_CAPACITACION.modules,
  ],
  providers: [IMaskPipe, ...MATERIAL_PROVIDERS],
})
export class CapacitacionModule {}

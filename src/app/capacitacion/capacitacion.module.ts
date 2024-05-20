import { NgModule } from '@angular/core';
import { IMaskPipe } from 'angular-imask';
import { CommonModule } from '@angular/common';
import { MATERIAL_PROVIDERS } from 'src/app/material/providers';
import { RoutingOverridePipe } from 'src/app/remote-entry/pipes/routing-override.pipe';
import { AdminRoutingModule } from './capacitacion-routing.module';
import { IMPORTS_CAPACITACION } from './imports.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [...IMPORTS_CAPACITACION.components],
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
    AdminRoutingModule,
    RoutingOverridePipe,
    ReactiveFormsModule,
    ...IMPORTS_CAPACITACION.modules,
  ],
  providers: [IMaskPipe, ...MATERIAL_PROVIDERS],
})

export class CapacitacionModule { }

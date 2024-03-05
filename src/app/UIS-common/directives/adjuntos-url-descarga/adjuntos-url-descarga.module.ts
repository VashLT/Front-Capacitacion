import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjuntosUrlDescargaDirective } from './adjuntos-url-descarga.directive';

@NgModule({
  declarations: [AdjuntosUrlDescargaDirective],
  imports: [CommonModule],
  exports: [AdjuntosUrlDescargaDirective],
})
export class AdjuntosUrlDescargaModule {}

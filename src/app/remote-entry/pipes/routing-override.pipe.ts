import { APP_BASE_HREF } from '@angular/common';
import { Inject, Optional, Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para ajustar routerlinks a la ruta base.
 */
@Pipe({
  name: 'routeOverride',
  standalone: true,
})
export class RoutingOverridePipe implements PipeTransform {
  /**
   * Contructor del pipe.
   */
  constructor(@Optional() @Inject(APP_BASE_HREF) private base: string) {}

  /**
   * Función para agregar la base de la app a cada ruta.
   *
   * @param value - Valor a arreglar.
   */
  transform(value: string[]): string[] {
    value[0] = (this.base ? '/' + this.base + '/' : '') + value[0];
    return value;
  }
}

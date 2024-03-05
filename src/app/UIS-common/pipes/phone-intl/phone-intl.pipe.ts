import { Pipe, PipeTransform } from '@angular/core';
import { IMaskPipe } from 'angular-imask';

/**
 * Pipe para formatear un número de teléfono a formato internacional.
 */
@Pipe({
  name: 'phoneIntl',
  standalone: true,
})
export class PhoneIntlPipe implements PipeTransform {
  /**
   * Contructor del pipe.
   *
   * @param imaskPipe - Pipe de imask.
   */
  constructor(private imaskPipe: IMaskPipe) {}

  /**
   * Función para transformar un número de teléfono del componente phone al formato visual.
   *
   * @param value - Valor a formatear.
   * @returns - Valor formateado.
   */
  transform(value: string): string {
    if (value) {
      const phoneNumber = value.slice(-10);
      const countryCode = value.slice(0, -10);
      return `(${countryCode}) ${this.imaskPipe.transform(phoneNumber, {
        mask: '000-000-0000',
        lazy: false,
        overwrite: true,
      })}`;
    }
    return '';
  }
}

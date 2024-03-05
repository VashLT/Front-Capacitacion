import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

/**
 * Pipe para transformar algunas fechas.
 * Muy usado cuando necesito validar un X dias despues o antes de una fecha.
 */
@Pipe({
  name: 'datesChange',
})
export class DatesChangePipe implements PipeTransform {
  /**
   * Función que transforma una fecha.
   *
   * @param value - Fecha a transformar.
   * @param type - Tipo de transformación.
   * @param days - Dias a sumar o restar.
   * @returns - Fecha transformada.
   */
  transform(value: Date | string, type: '-' | '+', days: number): Date {
    if (value) {
      if (typeof value === 'string') {
        value = new Date(value);
      }
      return type === '-'
        ? moment(value)
            .subtract(Number(days), 'days')
            .add(
              value.getHours() + new Date().getTimezoneOffset() / 60,
              'hours'
            )
            .toDate()
        : moment(value)
            .add(Number(days), 'days')
            .add(
              value.getHours() + new Date().getTimezoneOffset() / 60,
              'hours'
            )
            .toDate();
    } else {
      return null;
    }
  }
}

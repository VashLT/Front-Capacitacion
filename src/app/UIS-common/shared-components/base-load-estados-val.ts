import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  OnDestroy,
  Component,
  Inject,
  InjectionToken,
  Optional,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Injeccion de token para el control de estados de validacion.
 */
export const CONTROL_VAL = new InjectionToken<string>('controlVal');

/**
 * Componente base para setear el estado de validación por defecto.
 */
@Component({ template: '' })
export class EstadosValSetterComponent implements OnDestroy {
  /**
   * Estados de validacion.
   * Cada componente hijo lo carga.
   */
  estadosValidacion$ = null;

  /**
   * Formulario.
   * Cada componente hijo lo inicializa.
   */
  form: FormGroup;

  /**
   * Subscripción al subscribe de estados de validación.
   */
  subscriptionEstVal: Subscription;

  /**
   * Constructor.
   *
   * @param data - Datos enviados al modal.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() @Inject(CONTROL_VAL) public controlVal: string
  ) {}

  /**
   * Al destruir el componente, se desuscribe de la subscripción.
   */
  ngOnDestroy(): void {
    this.subscriptionEstVal?.unsubscribe();
  }

  /**
   * Se suscribe a los estados de validación.
   * Cambia el estado del control asociado para poner uno por defecto.
   */
  subscribeToEstadosValidacion() {
    const controlVal = this.controlVal || 'idEstadoValidacion';
    if (this.data?.insertMode) {
      this.subscriptionEstVal = this.estadosValidacion$?.subscribe((value) => {
        if (value) {
          for (const estado of value) {
            if (estado?.sigla?.toUpperCase() === 'PEND' && this.form) {
              this.form.get(controlVal).setValue(estado.id);
            }
          }
        }
      });
    }
  }
}

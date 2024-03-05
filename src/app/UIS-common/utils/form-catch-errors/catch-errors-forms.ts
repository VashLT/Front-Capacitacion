import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '@uis/uis-lib/services/snackbar';
import { tap, catchError, throwError } from 'rxjs';

/**
 * Función para obtener tipicos catchers de errores de crud.
 *
 * @param snackbar - SnackbarService
 * @param translate - TranslateService
 * @returns - Operators to catch errors.
 */
export const catchers = (
  snackbar: SnackbarService,
  translate: TranslateService,
  onSuccessMessage = 'CRUD_MESSAGES.ON_SAVE',
  onErrorMessage = 'CRUD_MESSAGES.ON_ERROR'
) =>
  [
    tap((val) => {
      snackbar.show({
        mensaje: translate.instant(val ? onSuccessMessage : onErrorMessage),
        tipo: val ? 'success' : 'error',
      });
    }),
    catchError((err) => {
      snackbar.showBackError(err);
      return throwError(() => new Error(err));
    }),
  ] as const;

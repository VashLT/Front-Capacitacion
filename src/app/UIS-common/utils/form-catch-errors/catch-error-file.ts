import { BackendError } from '@models/general/backend-error.dto';
import { TranslateService } from '@ngx-translate/core';
import { SnackbarService } from '@uis/uis-lib/services/snackbar';
import { throwError } from 'rxjs';

/**
 * Función para tratar errores en la descarga de archivos.
 *
 * @param err - Error de backend
 * @param snackbar - Servicio de snackbar
 * @param translate - Servicio de traducciones
 * @returns - Observable<BackendError>
 */
export const catchErrorFile = (
  err,
  snackbar: SnackbarService,
  translate: TranslateService
) => {
  if (err?.error?.text) {
    err.error.text().then((res: string) => {
      const backendError = JSON.parse(res) as BackendError;
      snackbar.show({
        mensaje:
          backendError.message ||
          translate.instant('CRUD_MESSAGES.ON_ERROR_UNKNOWN'),
        tipo: 'error',
      });
    });
  } else {
    snackbar.showBackError(err);
  }
  return throwError(() => new Error(err));
};

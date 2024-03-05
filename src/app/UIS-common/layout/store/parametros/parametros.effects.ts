import { ParametrosService } from "./../../shared/services/parametros/parametros.service";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, takeUntil } from "rxjs";
import * as actions from "./parametros.actions";
import { ParametrosToLoadService } from "../../shared/services/parametros/config/parametros-to-load.service";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";

/**
 * Efectos para los parámetros.
 */
@Injectable()
export class ParametrosEffect extends UnsubscriptorService {
  /**
   * Constructor de la clase.
   *
   * @param actions$ - Acciones que se ejecutan.
   */
  constructor(
    private actions$: Actions,
    private parametrosService: ParametrosService,
    private parametrosToLoadService: ParametrosToLoadService
  ) {
    super();
  }

  /**
   * Efecto para traer los parámetros.
   */
  getParametros$ = createEffect(
    () =>
      this.actions$.pipe(
        /**
         * filtra las acciones del tipo "getPersonData"
         */
        ofType(actions.getParametros),
        /**
         * Ejecuta el efecto siempre que no se haya dessubscrito de este.
         */
        takeUntil(this.unSubscriptor$),
        /**
         * hace la llamada al back para conseguir los datos de la persona
         */
        mergeMap((_) =>
          this.parametrosService
            .getParametrosByValues(
              this.parametrosToLoadService.getParamsToLoad()
            )
            .pipe(
              map((parametros) => actions.getParametrosSuccess({ parametros })),
              catchError((err) => {
                console.error(err);
                return of(actions.getParametrosError());
              })
            )
        )
      ),
    { dispatch: true }
  );
}

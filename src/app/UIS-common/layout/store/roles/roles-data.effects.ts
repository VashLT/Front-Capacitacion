import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, takeUntil } from "rxjs";
import * as actions from "./roles-data.actions";
import { AuthService } from "../../core/authentication/auth.service";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";

@Injectable()
export class RolDataEffect extends UnsubscriptorService {
  constructor(private actions$: Actions, private authService: AuthService) {
    super();
  }

  getRolData$ = createEffect(
    () =>
      this.actions$.pipe(
        /**
         * filtra las acciones del tipo "getRolData"
         */
        ofType(actions.getRolData),
        /**
         * Ejecuta el efecto siempre que no se haya dessubscrito de este.
         */
        takeUntil(this.unSubscriptor$),
        /**
         * hace la llamada al back para conseguir los roles
         */
        mergeMap((_) =>
          this.authService.getRolesData().pipe(
            map((rolesData) => actions.getRolDataSuccess({ roles: rolesData })),
            catchError((err) => {
              console.error(err);
              return of(actions.getRolDataError());
            })
          )
        )
      ),
    { dispatch: true }
  );
}

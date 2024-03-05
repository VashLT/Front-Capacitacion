import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, takeUntil } from "rxjs";
import * as actions from "./user-data.actions";
import { AuthService } from "../../core/authentication/auth.service";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";

@Injectable()
export class UserDataEffect extends UnsubscriptorService {
  constructor(private actions$: Actions, private authService: AuthService) {
    super();
  }

  getUserData$ = createEffect(
    () =>
      this.actions$.pipe(
        /**
         * filtra las acciones del tipo "getUserData"
         */
        ofType(actions.getUserData),
        /**
         * Ejecuta el efecto siempre que no se haya dessubscrito de este.
         */
        takeUntil(this.unSubscriptor$),
        /**
         * hace la llamada al back para conseguir los datos del usuario
         */
        mergeMap((_action) =>
          this.authService.getUserData().pipe(
            map((userData) => actions.getUserDataSuccess({ userData })),
            catchError((err) => {
              console.error(err);
              return of(actions.getUserDataError());
            })
          )
        )
      ),
    { dispatch: true }
  );
}

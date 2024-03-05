import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of, takeUntil } from "rxjs";
import * as actions from "./person-data.actions";
import { AuthService } from "../../core/authentication/auth.service";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";

@Injectable()
export class PersonDataEffect extends UnsubscriptorService {
  constructor(private actions$: Actions, private authService: AuthService) {
    super();
  }

  getPersonData$ = createEffect(
    () =>
      this.actions$.pipe(
        /**
         * filtra las acciones del tipo "getPersonData"
         */
        ofType(actions.getPersonData),
        /**
         * Ejecuta el efecto siempre que no se haya dessubscrito de este.
         */
        takeUntil(this.unSubscriptor$),
        /**
         * hace la llamada al back para conseguir los datos de la persona
         */
        mergeMap((_) =>
          this.authService.getPersonData().pipe(
            map((personData) => actions.getPersonDataSuccess({ personData })),
            catchError((err) => {
              console.error(err);
              return of(actions.getPersonDataError());
            })
          )
        )
      ),
    { dispatch: true }
  );
}

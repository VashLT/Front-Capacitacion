import { Injectable, Injector } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import {
  BehaviorSubject,
  delay,
  Observable,
  of,
  Subscription,
  throwError,
} from "rxjs";
import {
  catchError,
  filter,
  finalize,
  switchMap,
  take,
  takeUntil,
  tap,
} from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Store } from "@ngrx/store";
import { LayoutState } from "../../store/layout-store.model";
import { UserData } from "../../store/user/user-data.model";
import { STARTUP_ENDPOINT } from "../../constants/startup-endpoint";
import { UnsubscriptorService } from "@UIS-common/layout/core/unsubscriptor-service/base-unsubscriptor";
import { AuthService } from "@UIS-common/layout/core";

@Injectable()
export class AuthInterceptorService
  extends UnsubscriptorService
  implements HttpInterceptor
{
  userData: UserData;

  private AUTH_HEADER = "Authorization";
  private token;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private tokenSubscription = new Subscription();
  private timeout;
  constructor(
    private jwtHelper: JwtHelperService,
    private store: Store<LayoutState>,
    private injector: Injector
  ) {
    super();
    this.token = localStorage.getItem("authToken");
    this.initialize();
    this.store
      .select("user")
      .pipe(takeUntil(this.unSubscriptor$))
      .subscribe((data) => {
        if (!data) {
          return;
        }
        this.userData = data;
      });
  }
  async initialize() {
    if (this.jwtHelper.isTokenExpired(this.token)) {
      this.goToLogin();
    } else {
      this.timeout =
        this.jwtHelper.getTokenExpirationDate(this.token)?.valueOf() -
        new Date().valueOf();

      this.expirationCounter(this.timeout);
    }
  }
  expirationCounter(timeout) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null)
      .pipe(delay(timeout))
      .subscribe(() => {
        this.goToLogin();
      });
  }

  goToLogin() {
    const auth = this.injector.get(AuthService);
    auth.logout();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const handle = (request) =>
      next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error && error.status === 401) {
            // 401 errors are most likely going to be because we have an expired token that we need to refresh.
            if (this.refreshTokenInProgress) {
              // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
              // which means the new token is ready and we can retry the request again
              return this.refreshTokenSubject.pipe(
                filter((result) => result !== null),
                take(1),
                switchMap(() => next.handle(this.addAuthenticationToken(req)))
              );
            } else {
              this.refreshTokenInProgress = true;

              // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
              this.refreshTokenSubject.next(null);

              return this.refreshAccessToken().pipe(
                switchMap((success: boolean) => {
                  this.refreshTokenSubject.next(success);
                  return next.handle(this.addAuthenticationToken(req));
                }),
                // When the call to refreshToken completes we reset the refreshTokenInProgress to false
                // for the next time the token needs to be refreshed
                finalize(() => (this.refreshTokenInProgress = false))
              );
            }
          } else {
            return throwError(() => error);
          }
        })
      );
    // req = this.addAuthenticationToken(req);
    if (this.userData) {
      req = this.addAuthenticationToken(req);
      return handle(req);
    } else if (req.url === STARTUP_ENDPOINT) {
      /**
       * Se cargan en Redux los datos del usuario
       */
      return handle(
        req.clone({
          headers: req.headers.set(this.AUTH_HEADER, `Bearer ${this.token}`),
        })
      );
    } else {
      return this.store.select("user").pipe(
        filter((data) => Boolean(data)),
        take(1),
        tap((data) => {
          this.userData = data;
          req = this.addAuthenticationToken(req);
        }),
        switchMap((_) => handle(req))
      );
    }
  }

  private refreshAccessToken(): Observable<any> {
    return of("secret token");
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token || !this.userData) {
      return request;
    }
    return request.clone({
      headers: request.headers
        .set(this.AUTH_HEADER, "Bearer " + this.token)
        .set("idUsuario", "" + this.userData.ID)
        .set("idPersona", "" + this.userData.ID_PERSONA)
        .set("rolUsuario", "" + localStorage.getItem("idRol")),
    });
  }
}

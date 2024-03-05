import { Inject, Injectable, Optional } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { TokenService } from "../authentication/token.service";
import { BASE_URL } from "./base-url-interceptor";
import { AuthService } from "../authentication/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private token: TokenService,
    private auth: AuthService,
    @Optional() @Inject(BASE_URL) private baseUrl?: string
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const logoutHandler = () => {
      if (request.url.includes("/auth/logout")) {
        this.auth.logout();
      }
    };

    if (this.token.valid() && this.shouldAppendToken(request.url)) {
      return next
        .handle(
          request.clone({
            headers: request.headers.append(
              "Authorization",
              this.token.headerValue()
            ),
            withCredentials: true,
          })
        )
        .pipe(
          tap(() => logoutHandler()),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.token.clear();
            }
            return throwError(error);
          })
        );
    }

    return next.handle(request).pipe(tap(() => logoutHandler()));
  }

  private shouldAppendToken(url: string) {
    return !this.hasHttpScheme(url) || this.includeBaseUrl(url);
  }

  private hasHttpScheme(url: string) {
    return new RegExp("^http(s)?://", "i").test(url);
  }

  private includeBaseUrl(url: string) {
    if (!this.baseUrl) {
      return false;
    }

    const baseUrl = this.baseUrl.replace(/\/$/, "");

    return new RegExp(`^${baseUrl}`, "i").test(url);
  }
}

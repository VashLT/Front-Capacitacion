import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable, Subscription, throwError } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Overlay } from "@angular/cdk/overlay";
import { LoaderService } from "@uis/uis-lib/services/loader";

@Injectable()
export class LoadingInterceptorService implements HttpInterceptor {
  constructor(private loaderService: LoaderService, private overlay: Overlay) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const instancia = new LoaderService(this.overlay);
    if (req.headers.get("BG")) {
      instancia.backgroundColor = req.headers.get("BG");
    }
    //start loader
    const spinnerShow = () =>
      (req.method === "GET" || req.headers.get("SIMULATE-LOADER") === "GET") &&
      req.headers.get("SIMULATE-LOADER") !== "NONGET"
        ? instancia.spinner$.subscribe()
        : instancia.spinnerNoGet$.subscribe();

    const spinnerSubscription: Subscription = !req.headers.get("HIDE-LOADER")
      ? spinnerShow()
      : null;
    const request = req;

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => throwError(err)),
      finalize(() => spinnerSubscription?.unsubscribe())
    );
  }
}

import { filter, takeUntil, tap } from "rxjs/operators";
import { Overlay, OverlayRef } from "@angular/cdk/overlay";
import { ComponentRef, Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { catchError, Observable, Subject } from "rxjs";
import { ComponentPortal } from "@angular/cdk/portal";
import { GeneratingFileModalComponent } from "@UIS-common/layout/shared/components/generating-file-modal/generating-file-modal.component";
import { NavigationStart, Router } from "@angular/router";

/**
 * Interceptor que muestra un modal mientras se genera un archivo.
 */
@Injectable()
export class DownloadFileModalInterceptor implements HttpInterceptor {
  /**
   * Referencia al overlay.
   */
  private overlayRef: OverlayRef | undefined = undefined;

  /**
   * Referencia al componente del overlay.
   */
  componentRef: ComponentRef<GeneratingFileModalComponent> | undefined =
    undefined;

  /**
   * Cancelador de solicitud.
   */
  canceller = new Subject<boolean>();

  /**
   * Constructor del interceptor.
   *
   * @param overlay - Overlay
   */
  constructor(private overlay: Overlay, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => {
        this.hide();
      });
  }

  /**
   * Intercepta la solicitud que espera un archivo y muestra un modal mientras se genera el archivo.
   *
   * @param request - Request
   * @param next - HttpHandler
   * @returns - Observable<HttpEvent<unknown>>
   */
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.responseType === "blob") {
      this.show();
      return next.handle(request).pipe(
        tap((res: any) => {
          setTimeout(() => {
            if (res.body) {
              const contentDisposition = res.headers.get("Content-Disposition");
              let filename = "report";
              if (contentDisposition) {
                filename = contentDisposition
                  .split(";")[1]
                  .split("filename")[1]
                  .split("=")[1]
                  .replace(/"/g, "")
                  .trim();
              }
              const file = new File([res.body], filename, {
                type: res.body.type,
              });
              this.componentRef.instance.file = file;
            }
          }, 0);
        }),
        catchError((error) => {
          this.hide();
          throw error;
        }),
        takeUntil(this.canceller)
      );
    } else {
      return next.handle(request);
    }
  }

  /**
   * Muestra un loader.
   */
  public show(): void {
    Promise.resolve(null).then(() => {
      this.overlayRef = this.overlay.create({
        minWidth: 100,
        positionStrategy: this.overlay.position().global(),
        hasBackdrop: false,
      });
      this.componentRef = this.overlayRef.attach(
        new ComponentPortal(GeneratingFileModalComponent)
      );
      this.componentRef.instance.callback = () => {
        this.hide();
      };
      this.componentRef.instance.canceller = this.canceller;
    });
  }

  /**
   * Oculta el loader actual
   */
  public hide(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
    this.overlayRef = undefined;
  }
}

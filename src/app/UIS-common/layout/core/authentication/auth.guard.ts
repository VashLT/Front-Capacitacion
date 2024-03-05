import { Injectable } from "@angular/core";
import { Route, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
@Injectable()
export class AuthGuard {
  constructor() {}
  canLoad(
    // eslint-disable-next-line unused-imports/no-unused-vars
    route: Route,
    // eslint-disable-next-line unused-imports/no-unused-vars
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem("authToken")) {
      const urlArray = window.location.href.split("/");
      if (!urlArray[2].includes("localhost")) {
        window.location.href =
          urlArray[0] +
          "//" +
          urlArray[2] +
          (!environment.production ? "/" + urlArray[3] : "") +
          "/" +
          "auth";
      }
      return true;
    }
    return true;
  }
}

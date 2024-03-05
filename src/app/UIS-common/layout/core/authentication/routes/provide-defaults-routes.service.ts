import { Injectable } from "@angular/core";

@Injectable()
export class ProvideDefaultsRoutesService {
  readonly homePageUrl = "/capacitacion/portada";
  readonly pageNotFound = "/not-found";
}

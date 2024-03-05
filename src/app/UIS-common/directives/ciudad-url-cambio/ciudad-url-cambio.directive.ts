import { Directive } from '@angular/core';
import { CiudadChooserComponent } from '@uis/uis-lib/components/ciudad-chooser';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appCiudadUrlCambio]',
  standalone: true,
})
export class CiudadUrlCambioDirective {
  constructor(ciudadComponent: CiudadChooserComponent) {
    ciudadComponent.urlBack = `${environment.urlBackHV}/ciudad/suggestionByNombre/`;
    ciudadComponent.urlBackLoad = `${environment.urlBackHV}/ciudad/id/`;
  }
}

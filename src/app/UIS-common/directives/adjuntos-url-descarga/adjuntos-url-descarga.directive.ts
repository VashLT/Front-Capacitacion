import { Directive } from '@angular/core';
import { FileChooserComponent } from '@uis/uis-lib/components/file-chooser';
import { environment } from 'src/environments/environment';

@Directive({
  selector: '[appAdjuntosUrlDescarga]',
})
export class AdjuntosUrlDescargaDirective {
  constructor(componenteAdjuntos: FileChooserComponent) {
    componenteAdjuntos.urlDownload = `${environment.urlBackHV}/adjunto/download/id/`;
  }
}

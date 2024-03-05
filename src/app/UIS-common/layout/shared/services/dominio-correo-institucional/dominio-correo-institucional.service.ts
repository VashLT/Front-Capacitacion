import { shareReplay } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DominioCorreoInstitucional } from "../../models/dominio-correo-institucional.model";
@Injectable()
export class DominioCorreoInstitucionalService {
  /**
   * Observable de la lista de dominios correos institucionales.
   * Como es una lista que no cambia muy seguido se puede mantener en caché para
   * no tener que consultarlo de nuevo.
   */
  private $currentAllDominiosCorreos: Observable<DominioCorreoInstitucional[]>;

  constructor(private http: HttpClient) {}

  getAllDominiosCorreoInstitucional() {
    return this.http.get<DominioCorreoInstitucional[]>(
      `${environment.urlBackHV}/dominioCorreo`
    );
  }

  getDominiosCorreoInstitucionalVigentes() {
    if (!this.$currentAllDominiosCorreos) {
      this.$currentAllDominiosCorreos = this.http
        .get<DominioCorreoInstitucional[]>(
          `${environment.urlBackHV}/dominioCorreo/findAllVigentesAHoy`
        )
        .pipe(shareReplay(1));
    }
    return this.$currentAllDominiosCorreos;
  }
}

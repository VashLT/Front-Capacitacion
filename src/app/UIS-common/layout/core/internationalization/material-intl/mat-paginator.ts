import { Injectable, Injector } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";
import { TranslateParser, TranslateService } from "@ngx-translate/core";
/**
 * Servicio para traducir el paginator de material usando i18n.
 */
@Injectable()
export class UISMatPaginatorIntl extends MatPaginatorIntl {
  /**
   * Traduce el rango de paginas.
   */
  private rangeLabelIntl: string;

  private translateService: TranslateService;

  /**
   *  Constructor del servicio.
   *
   * @param translateService - Servicio de traduccion.
   * @param translateParser - Servicio que me permite interpolar.
   */
  constructor(
    private injector: Injector,
    private translateParser: TranslateParser
  ) {
    super();
    setTimeout(() => {
      this.translateService = this.injector.get(TranslateService);
      this.translateService.onLangChange.subscribe(() => {
        this.getTranslations();
      });
      this.getTranslations();
    }, 0);
  }

  /**
   * Método para obtener las traducciones y aplicarlas sobre el paginador.
   */
  getTranslations() {
    this.translateService
      .get([
        "TABLE_OPTIONS.PAGINATOR.ITEMS_PER_PAGE",
        "TABLE_OPTIONS.PAGINATOR.NEXT_PAGE",
        "TABLE_OPTIONS.PAGINATOR.FIRST_PAGE",
        "TABLE_OPTIONS.PAGINATOR.LAST_PAGE",
        "TABLE_OPTIONS.PAGINATOR.PREVIOUS_PAGE",
        "TABLE_OPTIONS.PAGINATOR.RANGE",
      ])
      .subscribe((translation) => {
        this.itemsPerPageLabel =
          translation["TABLE_OPTIONS.PAGINATOR.ITEMS_PER_PAGE"];
        this.nextPageLabel = translation["TABLE_OPTIONS.PAGINATOR.NEXT_PAGE"];
        this.previousPageLabel =
          translation["TABLE_OPTIONS.PAGINATOR.PREVIOUS_PAGE"];
        this.firstPageLabel = translation["TABLE_OPTIONS.PAGINATOR.FIRST_PAGE"];
        this.lastPageLabel = translation["TABLE_OPTIONS.PAGINATOR.LAST_PAGE"];
        this.rangeLabelIntl = translation["TABLE_OPTIONS.PAGINATOR.RANGE"];
        this.changes.next();
      });
  }

  /**
   * Método para obtener los rangos del paginador traducidos.
   *
   * @param page - Pagina actual.
   * @param pageSize - Items de la pagina.
   * @param length - Longitud total de la tabla.
   * @returns - String con los datos interpolados.
   */
  getRangeLabel = (page, pageSize, length) => {
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return this.translateParser.interpolate(this.rangeLabelIntl, {
      startIndex: startIndex + 1,
      endIndex,
      length,
    });
  };
}

export interface TituloAcademico {
  id: number;
  nombre: string;
  codigo: string;

  id_detalle_clasif: number;
  orden: number;
  fechaDesde: Date;
  fechaHasta: Date;
}

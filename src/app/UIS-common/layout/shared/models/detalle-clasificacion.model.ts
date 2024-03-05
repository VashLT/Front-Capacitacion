export interface DetalleClasificacion {
  id: number;
  codigo: string;
  nombre: string;
  sigla?: string;
  orden: number;
  fechaDesde: Date;
  fechaHasta: Date;
}

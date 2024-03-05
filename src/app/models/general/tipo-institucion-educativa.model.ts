export interface TipoInstitucionEducativa {
  id: number;
  codigo: string;
  fechaDesde: Date;
  fechaHasta: Date;
  nombre: string;
  orden?: number;
  sigla: string;
}

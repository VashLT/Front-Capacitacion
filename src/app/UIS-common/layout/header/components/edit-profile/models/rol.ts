export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  idTipoRol: number;
  nombreTipoRol: string;
  hasPermits: boolean;
}

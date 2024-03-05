export interface Rol {
  id: number;
  nombre: string;
  descripcion: string;
  idTipoRol: number;
  rolPorDefecto: boolean;
  nombreTipoRol: string;
  hasPermits: boolean;
}

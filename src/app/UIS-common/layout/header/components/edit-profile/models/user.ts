import { Rol } from "./rol";

export interface User {
  id: number;
  nombreUsuario: string;
  nombrePersona: string;
  documento: string;
  informacionPersona: string;
  fechaCreacion: Date;
  fechaModificacion: Date;
  isActivo: boolean;
  hasPermits: boolean;
  permitsType: string;
  rolList: Rol[];
}

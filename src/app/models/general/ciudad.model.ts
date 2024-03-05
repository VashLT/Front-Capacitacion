import { Estado } from './estado.model';

export interface Ciudad {
  id: number;
  nombre: string;
  codigoIdentificacion: string;
  activo: boolean;
  estado: Estado;
}

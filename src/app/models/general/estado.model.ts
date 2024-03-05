import { Pais } from './pais.model';

export interface Estado {
  id: number;
  codigoZIP: string;
  codigoIdentificacion: string;
  nombre: string;
  indicativo: string;
  activo: boolean;
  pais: Pais;
}

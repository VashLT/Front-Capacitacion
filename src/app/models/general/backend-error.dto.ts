export interface BackendError {
  status_code: number;
  message: string;
  tipo: string;
  uri: string;
  posibilidad_continuar: boolean;
}

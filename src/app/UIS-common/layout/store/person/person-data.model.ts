export interface PersonData {
  ID: number;
  PRIMER_NOMBRE: string;
  SEGUNDO_NOMBRE: string;
  PRIMER_APELLIDO: string;
  SEGUNDO_APELLIDO: string;
  EMAIL_CORP?: string;
  EMAIL_PER: string;
  AUTHORIZED_HV?: boolean;
  ID_FOTO_USUARIO?: number;
}

export interface EditPersonData {
  PRIMER_NOMBRE?: string;
  SEGUNDO_NOMBRE?: string;
  PRIMER_APELLIDO?: string;
  SEGUNDO_APELLIDO?: string;
  EMAIL_PER?: string;
  EMAIL_CORP?: string;
  AUTHORIZED_HV?: boolean;
  ID_FOTO_USUARIO?: number;
}

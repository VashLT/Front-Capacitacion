export interface User {
  [propName: string]: any;

  id: number;
  name?: string;
  email?: string;
  avatar?: string;
  rolName?: string;
  rol?: string;
}

export interface Token {
  access_token?: string;
  token?: string;

  token_type?: string;

  expires_in?: number;
}

export interface RefreshToken {
  refresh: boolean;
  accessToken: string;
  tokenType: string;
  exp: number;

  refreshTime: () => number;
  valid: () => boolean;
}

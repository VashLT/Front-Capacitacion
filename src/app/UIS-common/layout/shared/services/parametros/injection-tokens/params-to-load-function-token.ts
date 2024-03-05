import { InjectionToken } from "@angular/core";

export const FUNCTION_TO_LOAD_PARAMS = new InjectionToken<
  (...args: any[]) => string[]
>("FUNTION_TO_LOAD_PARAMS");

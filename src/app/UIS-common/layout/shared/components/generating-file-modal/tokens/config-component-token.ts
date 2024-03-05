import { InjectionToken } from "@angular/core";
import { ConfigCompModel } from "../models/config-comp.model";

/**
 * Token para configurar el componente GeneratingFileModalComponent.
 */
export const CONFIG_GENERATING_FILE_TOKEN: InjectionToken<ConfigCompModel> =
  new InjectionToken<ConfigCompModel>(
    "ConfigComponentGeneratingFileModalToken"
  );

import { HttpFactoryService } from "@uis/uis-lib/services/http-factory";
import { AuthService } from "../authentication/auth.service";
import { ProvideDefaultsRoutesService } from "../authentication/routes/provide-defaults-routes.service";
import { TokenService } from "../authentication/token.service";
import { MenuStoreLoaderService } from "../bootstrap/menu-store-loader.service";
import { MenuService } from "../bootstrap/menu.service";
import { UISMatPaginatorIntl } from "../internationalization/material-intl/mat-paginator";
import { NetworkStatusService } from "../network-status/services/status/network-status.service";
import { SeoService } from "../seo/seo.service";
import { ConfirmUpdateService } from "../service-workers/updating-app/services/confirm-update-version-app/confirm-update.service";
import { UserService } from "../../header/components/edit-profile/services/user.service";
import { RolService } from "../../header/components/set-default-role/services/rol.service";
import { ParametrosService } from "../../shared/services/parametros/parametros.service";
import { ResetPasswordService } from "../../header/components/change-password/services/reset-password.service";
import { ImageService } from "../../header/components/edit-image/services/image.service";
import { EditProfileService } from "../../header/components/edit-profile/services/edit-profile.service";
import { LocalStorageService } from "../../shared";
import { NavigationService } from "../../shared/services/navigation/navigation.service";
import { ParametrosToLoadService } from "../../shared/services/parametros/config/parametros-to-load.service";
import { MenuDataService } from "../../store/menu/menu-data.service";
import { TranslateLoaderImplService } from "../internationalization/services/translate-loader-impl.service";
import { RolActionsService } from "../authentication/rol-actions/rol-actions.service";

/**
 * Providers que se deben proveer a nivel root (AppModule or EntryModule) para un correcto funcionamiento del layout module.
 */
export const LAYOUT_PROVIDERS_ROOT = [
  UserService,
  RolService,
  AuthService,
  TokenService,
  MenuStoreLoaderService,
  NetworkStatusService,
  ConfirmUpdateService,
  MenuService,
  ParametrosService,
  ParametrosToLoadService,
  SeoService,
  UISMatPaginatorIntl,
  NavigationService,
  ProvideDefaultsRoutesService,
  LocalStorageService,
  EditProfileService,
  ResetPasswordService,
  MenuDataService,
  ImageService,
  HttpFactoryService,
  TranslateLoaderImplService,
  RolActionsService,
];

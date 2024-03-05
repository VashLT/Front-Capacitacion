import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AlertIncComponent } from "./alert-inc.component";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { I18N_UIS } from "@UIS-common/layout/core/internationalization/config/i18n-uis";

@NgModule({
  declarations: [AlertIncComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, ...I18N_UIS.lazy],
  exports: [AlertIncComponent],
})
export class AlertIncModule {}

import { I18N_UIS } from "@UIS-common/layout/core/internationalization/config/i18n-uis";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GeneratingFileModalComponent } from "./generating-file-modal.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { LoaderModule } from "@uis/uis-lib/components/loader";

@NgModule({
  declarations: [GeneratingFileModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    I18N_UIS.lazy,
    LoaderModule,
  ],
  exports: [GeneratingFileModalComponent],
})
export class GeneratingFileModalModule {}

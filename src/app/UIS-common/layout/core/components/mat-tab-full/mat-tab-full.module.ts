import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabFullComponent } from "./components/mat-tab-full/mat-tab-full.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CrudCreateTabComponent } from "./components/crud-create-tab/crud-create-tab.component";
import { MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { TranslateModule } from "@ngx-translate/core";
import { MatInputModule } from "@angular/material/input";
import { CrudDialogModule } from "@uis/uis-lib/components/crud-dialog";
import { MatTabFullContentDirective } from "./directives/mat-tab-full-content/mat-tab-full-content.directive";
import { ConfirmModule } from "@uis/uis-lib/components/confirm";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
  declarations: [
    MatTabFullComponent,
    MatTabFullContentDirective,
    CrudCreateTabComponent,
  ],
  exports: [
    MatTabFullComponent,
    MatTabFullContentDirective,
    CrudCreateTabComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    TranslateModule,
    ConfirmModule,
    CrudDialogModule,
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class MatTabFullModule {}

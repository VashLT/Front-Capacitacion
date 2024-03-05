import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
// eslint-disable-next-line max-len
import { SearchPipe } from './pipes/search/search.pipe';
import { AdjuntosUrlDescargaModule } from './directives/adjuntos-url-descarga/adjuntos-url-descarga.module';
import { FileChooserModule } from '@uis/uis-lib/components/file-chooser';
import { MatSelectTwoModule } from '@uis/uis-lib/components/mat-select-two';
import { CrudDialogModule } from '@uis/uis-lib/components/crud-dialog';
import { PipesModule } from '@uis/uis-lib/pipes';
import { ConfirmModule } from '@uis/uis-lib/components/confirm';

@NgModule({
  declarations: [ExponentialPipe, SearchPipe],
  exports: [
    ExponentialPipe,
    PipesModule,
    SearchPipe,
    FileChooserModule, //LIBRERIA
    ConfirmModule, //LIBRERIA
    CrudDialogModule, //LIBRERIA
    MatSelectTwoModule, //LIBRERIA
    AdjuntosUrlDescargaModule,
    TextFieldModule,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule,
    FileChooserModule, //LIBRERIA
    ConfirmModule, //LIBRERIA
    CrudDialogModule, //LIBRERIA
    MatSelectTwoModule,
    AdjuntosUrlDescargaModule, //LIBRERIA
    TextFieldModule,
  ],
})
export class UISCommon {}

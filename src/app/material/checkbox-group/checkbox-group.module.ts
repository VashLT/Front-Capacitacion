import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [CheckboxGroupComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
  exports: [CheckboxGroupComponent],
})
export class CheckboxGroupModule {}

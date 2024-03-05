import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetNameByIdPipe } from './get-name-by-id.pipe';

@NgModule({
  declarations: [GetNameByIdPipe],
  imports: [CommonModule],
  exports: [GetNameByIdPipe],
})
export class GetNameByIdModule {}

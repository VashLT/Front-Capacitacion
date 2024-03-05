import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatesChangePipe } from './dates-change.pipe';

@NgModule({
  declarations: [DatesChangePipe],
  imports: [CommonModule],
  exports: [DatesChangePipe],
})
export class DatesChangeModule {}

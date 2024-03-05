import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SentencePipe } from '../sentence.pipe';

@NgModule({
  declarations: [SentencePipe],
  imports: [CommonModule],
  exports: [SentencePipe],
})
export class SentenceModule {}

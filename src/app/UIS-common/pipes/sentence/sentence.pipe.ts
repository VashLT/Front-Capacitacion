import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sentence',
})
export class SentencePipe implements PipeTransform {
  transform(value: string): string {
    if (value?.length > 1) {
      const first = value.substr(0, 1).toUpperCase();
      return first + value.substr(1).toLowerCase();
    } else {
      if (value) {
        return value.toUpperCase();
      } else {
        return '';
      }
    }
  }
}

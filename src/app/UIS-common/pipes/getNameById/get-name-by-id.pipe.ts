import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getNameById',
})
export class GetNameByIdPipe implements PipeTransform {
  transform(
    id: number,
    array: any[],
    keyIn: string,
    keyOutput: string
  ): unknown {
    const busqueda = array?.find((el) => el[keyIn] === id);
    return busqueda ? busqueda[keyOutput] : '';
  }
}

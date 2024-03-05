import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  constructor(private http: HttpClient) {}
  transform(
    busqueda: string,
    endpoint: string,
    caracter?: number
  ): Observable<any[]> {
    return busqueda?.length >= (caracter ?? 2)
      ? this.http
          .get<any[]>(`${environment.urlBackHV}${endpoint}${busqueda}`)
          .pipe(debounceTime(500))
      : of([]);
  }
}

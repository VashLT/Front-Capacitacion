import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EjemploService {
  private nombre: string = '';
  observable$ = new Observable<number>((subscriber) => {
    setTimeout(() => {
      subscriber.next(1);
    }, 1000);

    setTimeout(() => {
      subscriber.next(2);
      subscriber.complete();
    }, 2000);
  });


  // observable$ = new Observable<number>((subscriber) => {
  //   // define el cuerpo del observable
  //   return () => {
  //     // lógica cuando se destruye
  //   };
  // })

  constructor() { }

  getNombre(): string {
    return this.nombre;
  }

  setNombre(nombre: string): void {
    this.nombre = nombre;
  }
}

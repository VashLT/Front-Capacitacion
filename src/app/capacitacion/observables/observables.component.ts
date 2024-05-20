import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';
import { BehaviorSubject, filter, interval, map, of, Subject, take } from "rxjs";

@Component({
  selector: 'app-observables',
  templateUrl: './observables.component.html',
  styleUrl: './observables.component.css',
})
export class ObservablesComponent implements OnInit {
  subject$: Subject<number>;
  nombre$ = new BehaviorSubject<string>('Jose');
  ngOnInit(): void { 
    // this.subject$ = new Subject();
    // this.subject$.subscribe(x => console.log(x));

    // this.subject$.next(1);
    // // Output: 1

    // this.subject$.next(2);
    // // Output: 2

    // this.subject$.complete();
    // // El subject ya no está "activo"

    // this.subject$.next(3);
    // // Output: es ignorado silenciosamente


    // interval(1000).pipe(map((time) => time + 's')).subscribe((value) => {
    //   console.log(value);
    // });

    this.nombre$.getValue();
    // Output: Jose

    this.nombre$.next('Gian');
    this.nombre$.getValue();
    // Output: Gian

    of(1, 2, 3).subscribe((result) => {
      console.log(result);
      // Output: 1
      // Output: 2
      // Output: 3
    });

    const source$ = of(1, 2, 3, 4, 5);
    source$.pipe(
      map(x => x * 10),
      filter(x => x > 20),
      take(2)
    ).subscribe(value => console.log(value)); // Output: 30, 40
  }

}

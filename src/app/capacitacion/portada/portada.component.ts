import { Component, OnDestroy } from '@angular/core';
import { EjemploService } from '../service/ejemplo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.scss',
})
export class PortadaComponent { 

  nombreIngresado: string = '';

  constructor(private ejemploService: EjemploService) {}

  ngOnInit(): void { }

  onNombreIngresado(nombre: string): void {
    this.ejemploService.setNombre(nombre);
  }

}


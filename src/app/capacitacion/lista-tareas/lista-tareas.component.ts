import { CommonModule } from "@angular/common";
import { Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrl: './lista-tareas.component.css',
})
export class ListaTareasComponent {
  tareas = ['Task 1', 'Task 2', 'Task 3'];

  gestionarTareaCompletada() {
    console.log('tarea completada');
  }
}

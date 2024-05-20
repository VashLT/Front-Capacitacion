import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrl: './tarea.component.css',
})
export class TareaComponent { 
  @Input() tarea: string;
  @Output() tareaCompletada = new EventEmitter<void>();

  completarTarea() {
    this.tareaCompletada.emit();
  }
}

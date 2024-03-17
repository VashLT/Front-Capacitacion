import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {
  input1: number = null;
  input2: number = null;
  resultado: number = null;

  sumar(): void {
    this.resultado = this.input1 + this.input2;
  }



  // Calculadora 1



  display = '0';
  firstValue: number | null = null;
  action: string | null = null;
  
  numClick(val) {
      if (this.display === '0') {
          this.display = val.toString();
      } else {
          this.display = `${this.display}${val}`;
      }
  }
  
  oper(action) {
      if (this.action) {
          this.calculate(); // Realizar cálculo previo si hay una acción pendiente
      }
      this.firstValue = parseFloat(this.display);
      this.action = action;
      this.display = ' ';
  }
  
  calculate() {
      const a = this.firstValue;
      const b = parseFloat(this.display);
  
      let result;
      if (this.action === 'm') {
          result = a * b;
      } else if (this.action === 'd') {
          result = a / b;
      } else if (this.action === 'a') {
          result = a + b;
      } else if (this.action === 's') {
          result = a - b;
      }
    
      this.firstValue = result;
      this.display = result.toString();
  }
  
  resetCalculator() {
      this.display = '0';
      this.firstValue = null;
      this.action = null;
  }

}

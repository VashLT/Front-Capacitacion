import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {


  // Calculadora 1

  display = '';
  primerOperando: number | null = null;
  segundoOperando: number | null = null;
  operacion: string | null = '';

  
  numClick(val) {
      this.display += val;

      if(this.operacion !== '') {
        // Si hay una operación en curso, el segundo operando será lo que hay después del signo de operación
        const partes = this.display.split(' ');
        this.segundoOperando = parseFloat(partes[partes.length - 1]);
      }    
  }

  oper(operacion) {

    // Si hay un valor en el display y aún no hay una operación, guardamos el primer operando
    if (this.display !== '' && this.operacion === ''){
      this.primerOperando = parseFloat(this.display);
      this.operacion = operacion;
      this.display += ' ' + operacion + ' ';
    } else {
        return
    }
  }
  
  calculate() {
      const a = this.primerOperando;
      const b = this.segundoOperando;

      // si aún no hay segundo operando, que no haga ningún cálculo aún
      if(this.segundoOperando === null){
        return
      }
  
      let result;
      if (this.operacion === '*') {
          result = a * b;
      } else if (this.operacion === '/') {
          result = a / b;
      } else if (this.operacion === '+') {
          result = a + b;
      } else if (this.operacion === '-') {
          result = a - b;
      }
    
      this.display = result.toString();
      // Hacemos que el primer operando sea igual a resultado para seguir haciendo operaciones y este sea el primer operando
      this.primerOperando = result;
      this.segundoOperando = null;
      this.operacion = '';

  }
  
  resetCalculator() {
      this.display = '';
      this.primerOperando = null;
      this.segundoOperando = null;
      this.operacion = '';
  }

}

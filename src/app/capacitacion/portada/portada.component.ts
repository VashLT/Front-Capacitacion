import { Component } from '@angular/core';

@Component({
  selector: 'app-portada',
  templateUrl: './portada.component.html',
  styleUrl: './portada.component.scss',
})
export class PortadaComponent {
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
    }
    else if (this.action === 'd') {
      result = a / b;
    }
    else if (this.action === 'a') {
      result = a + b;
    }
    else if (this.action === 's') {
      result = a - b;
    }

    this.firstValue = result;
    this.display = result.toString();
  }




  // Calculadora 2



  currentNumber: string = '0';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitForSecondNumber: boolean = false;

  getNumber(num: string) {
    if (this.waitForSecondNumber) {
      this.currentNumber = num;
      this.waitForSecondNumber = false;
    } else {
      this.currentNumber === '0' ? this.currentNumber = num : this.currentNumber += num;
    }
  }

  pressOperator(op: string) {
    this.firstOperand = parseFloat(this.currentNumber);
    this.operator = op;
    this.currentNumber = '0';
    this.waitForSecondNumber = true;
  }

  getAnswer() {
    const secondOperand = parseFloat(this.currentNumber);
    if (this.operator === null || this.firstOperand === null) return;

    switch (this.operator) {
      case '+':
        this.currentNumber = (this.firstOperand + secondOperand).toString();
        break;
      case '-':
        this.currentNumber = (this.firstOperand - secondOperand).toString();
        break;
      case '*':
        this.currentNumber = (this.firstOperand * secondOperand).toString();
        break;
      case '/':
        if (secondOperand === 0) {
          this.currentNumber = "Error";
        } else {
          this.currentNumber = (this.firstOperand / secondOperand).toString();
        }
        break;
    }
    this.firstOperand = null;
    this.operator = null;
  }

  clear() {
    if (this.currentNumber !== '0') {
      this.currentNumber = '0';
    }
  }

  allClear() {
    this.currentNumber = '0';
    this.firstOperand = null;
    this.operator = null;
    this.waitForSecondNumber = false;
  }


  // Calculadora 3

  num1: number = null;
  num2: number = null;
  result: number = null;

  calculate3(operation: string): void {
    switch (operation) {
      case 'add':
        this.result = this.num1 + this.num2;
        break;
      case 'subtract':
        this.result = this.num1 - this.num2;
        break;
      case 'multiply':
        this.result = this.num1 * this.num2;
        break;
      case 'divide':
        this.result = this.num1 / this.num2;
        break;
      default:
        this.result = 0;
        break;
    }
  }

}

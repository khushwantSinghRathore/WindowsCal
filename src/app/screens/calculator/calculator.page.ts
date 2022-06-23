/* eslint-disable no-eval */
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  memory: any;
  displayEqv = '';
  preVal = '';
  whichOp = '';
  currentVal = '';
  displayBtn = [
    ['%', 'CE', 'C', 'clear'],
    ['¹/x', 'x²', '²√x', '/'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['+/-', '0', '.', '=']
  ];
  isoptar = false;
  curropt = '';

  singleValOpr = ['+/-', '¹/x', 'x²', '²√x'];
  operator = ['%', '/', 'x', '-', '+'];


  darkopr = ['%', '¹/x', 'x²', '²√x', '/', 'x', '-', '+', 'CE', 'C', 'clear'];

  constructor(private menu: MenuController) { }

  ngOnInit() {
  }


  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  onBtn(valOr) {


    if (valOr === 'clear') {
      console.log('true');
      this.currentVal = this.currentVal.slice(0, -1);
      console.log(this.currentVal);
      return;
    }

    if (this.singleValOpr.includes(valOr)) {
      this.singleXopr(valOr);
      return;
    }

    if (this.operator.includes(valOr)) {
      this.curropt = valOr;
      this.isoptar = true;
      this.displayEqv = this.currentVal + valOr;
      return;
    }

    if (valOr === '=') {
      console.log(this.operationPerform());
      this.currentVal = String(this.operationPerform());
      return;
    }

    if (valOr === 'CE') {
      this.currentVal = '0';
      return;
    }

    if (valOr === 'C') {
      this.currentVal = '0';
      this.displayEqv = '';
      return;
    }

    if(valOr === '.'){
      if(this.currentVal.includes('.')){
        return;
      }
      else{
        this.currentVal = this.currentVal + '.';
        return;
      }
    }

    if (valOr) {
      if (this.currentVal === '0' || this.isoptar) {
        this.isoptar = false;
        this.currentVal = valOr;
      } else {
        this.currentVal = this.currentVal.concat(valOr);
        console.log(this.currentVal);
      }
    }


  }



  operationPerform() {
    let value: any;
    if (this.currentVal === 'x') {
      const temp = this.preVal.slice(0, -1);
      value = temp.concat('*', this.currentVal);
    } else {
      value = this.preVal.concat(this.currentVal);
    }
    const rtval = eval(value);
    return rtval;
  }


  singleXopr(exp) {
    console.log(exp);


    switch (exp) {

      case '+/-': {
        this.displayEqv = `negate(${this.numFromStr(this.currentVal) })`;
        if (this.currentVal.includes('-')) {
          this.currentVal = this.currentVal.slice(0,-1);
          console.log(true);
        }else{
          const mis = '-';
          this.currentVal = this.currentVal.concat(mis);
          console.log(false);
        }
        break;
      }
      case '¹/x': {
        this.displayEqv = `1/(${this.currentVal})`;
        this.currentVal = (1 / this.numFromStr(this.currentVal)).toString();
        break;
      }
      case 'x²': {
        this.displayEqv = `sqr(${this.currentVal})`;
        this.currentVal = ( this.numFromStr(this.currentVal) * this.numFromStr(this.currentVal) ).toString();
        break;
      }
      case '²√x': {
        this.displayEqv = `√(${this.currentVal})`;
        this.currentVal = Math.sqrt(this.numFromStr(this.currentVal)).toString();
        break;
      }
    }


  }


  numFromStr(str){
    const num = str.replace(/[^0-9]/g, '');
    return parseInt(num,10);
  }

}

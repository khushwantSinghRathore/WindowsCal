/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { MemorycompComponent } from '../../components/memorycomp/memorycomp.component';
import * as numcon from 'strnum';
import { LastsavedService } from 'src/app/service/lastsaved.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  memory: any;
  lastten: any[] = [];
  memoArr: any[] = [];
  displayEqv = '';
  preVal = '';
  whichOp = '';
  currentVal = '0';
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
  operator = ['/', 'x', '-', '+'];

  isModalOpen = false;
  darkopr = ['%', '¹/x', 'x²', '²√x', '/', 'x', '-', '+', 'CE', 'C', 'clear'];

  constructor(private menu: MenuController,private modalCtrl: ModalController,public lastsave: LastsavedService) { }

  ngOnInit() {
    this.lastsave.memoryObj.subscribe( res => this.memory =  res);
    this.lastsave.setthismemo.subscribe( res => {
      if(res){
        this.currentVal =  res;
        this.lastsave.setcurrtmemo('');
      }
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: MemorycompComponent,
      showBackdrop: true,
      initialBreakpoint: 0.5,
      breakpoints: [0,0.5],
      handle: false,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

  }




  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  onBtn(valOr) {


    if (valOr === 'clear') {
      if (this.currentVal !== '0') {
        this.currentVal = this.currentVal.slice(0, -1);
      }
      if (this.currentVal.includes('NaN') || this.currentVal === undefined || this.currentVal === '' || this.currentVal === null) {
        this.currentVal = '0';
      }
      return;
    }

    if (this.singleValOpr.includes(valOr)) {
      this.singleXopr(valOr);
      return;
    }

    if (this.operator.includes(valOr)) {

      if (this.currentVal === 'NaN' || this.currentVal === undefined || this.currentVal === '' || this.currentVal === '0' || this.currentVal === null) {
        this.currentVal = '0';
        return;
      } else {
        this.curropt = valOr;
        this.isoptar = true;
        if(this.preVal && this.isoptar){
          this.multiop();
        }else{
          this.preVal = this.currentVal;
          this.displayEqv = this.currentVal + valOr;
        }
        return;
      }

    }

    if (valOr === '=') {
      if (this.currentVal === 'NaN' || this.currentVal === undefined || this.currentVal === '' || this.currentVal === '0' || this.currentVal === null) {
        this.currentVal = '0';
        return;
      } else {
        if (this.preVal === 'NaN' || this.preVal === undefined || this.preVal === '' || this.preVal === '0' || this.preVal === null) {
          this.currentVal = '0';
          return;
        } else {
          this.equals();
        }
      }
      return;
    }

    if (valOr === '%') {
      if (this.displayEqv.includes(this.preVal)) {
        this.currentVal = (numcon(this.currentVal) / 100).toString();
      } else {
        this.currentVal = '0';
      }
      return;
    }

    if (valOr === 'CE') {
      this.currentVal = '0';
      return;
    }

    if (valOr === 'C') {
      this.currentVal = '0';
      this.preVal = '';
      this.displayEqv = '';
      this.isoptar = false;
      return;
    }

    if (valOr === '.') {
      if (this.currentVal.includes('.')) {
        return;
      }
      else {
        this.currentVal += '.';
        return;
      }
    }

    if (valOr) {
      if (numcon(this.currentVal) > 9999999999) {
        return;
      }
      if (this.currentVal.includes('NaN') || this.currentVal === undefined || this.currentVal === '' || this.currentVal === null) {
        this.currentVal = valOr;
      } else {
        if (this.currentVal === '0' || this.isoptar) {
          this.isoptar = false;
          this.currentVal = valOr;
        } else {
          this.currentVal += valOr;
        }
      }
    }


  }


  singleXopr(exp) {

    switch (exp) {
      case '+/-': {
        this.displayEqv = `negate(${numcon(this.currentVal)})`;
        if (this.currentVal.includes('-')) {
          this.currentVal = this.currentVal.slice(1);
        } else {
          const mis = '-';
          this.currentVal = mis.concat(this.currentVal);
        }
        break;
      }
      case '¹/x': {
        this.displayEqv = `1/(${this.currentVal})`;
        this.currentVal = (1 / numcon(this.currentVal)).toString();
        break;
      }
      case 'x²': {
        this.displayEqv = `sqr(${this.currentVal})`;
        this.currentVal = (numcon(this.currentVal) * numcon(this.currentVal)).toString();
        break;
      }
      case '²√x': {
        this.displayEqv = `√(${this.currentVal})`;
        this.currentVal = Math.sqrt(numcon(this.currentVal)).toString();
        break;
      }
    }

  }


  equals() {

    switch (this.curropt) {
      case ('+'): {
        this.displayEqv = `${this.preVal} ${this.curropt} ${this.currentVal} =`;
        this.currentVal = (numcon(this.preVal) + numcon(this.currentVal)).toString();
        this.addtoLastTen(this.displayEqv);
        break;
      }
      case ('-'): {
        this.displayEqv = `${this.preVal} ${this.curropt} ${this.currentVal} =`;
        this.currentVal = (numcon(this.preVal) - numcon(this.currentVal)).toString();
        this.addtoLastTen(this.displayEqv);
        break;
      }
      case ('/'): {
        this.displayEqv = `${this.preVal} ${this.curropt} ${this.currentVal} =`;
        this.currentVal = (numcon(this.preVal) / numcon(this.currentVal)).toString();
        this.addtoLastTen(this.displayEqv);
        break;
      }
      case ('x'): {
        this.displayEqv = `${this.preVal} ${this.curropt} ${this.currentVal} =`;
        this.currentVal = (numcon(this.preVal) * numcon(this.currentVal)).toString();
        this.addtoLastTen(this.displayEqv);
        break;
      }
    }

  }


  multiop() {

    switch (this.curropt) {
      case ('+'): {
        this.addtoLastTen(`${this.preVal} ${this.curropt} ${this.currentVal} =`);
        this.currentVal = (numcon(this.preVal) + numcon(this.currentVal)).toString();
        this.preVal = this.currentVal;
        this.displayEqv = `${this.preVal} ${this.curropt} `;
        break;
      }
      case ('-'): {
        this.addtoLastTen(`${this.preVal} ${this.curropt} ${this.currentVal} =`);
        this.currentVal = (numcon(this.preVal) - numcon(this.currentVal)).toString();
        this.preVal = this.currentVal;
        this.displayEqv = `${this.preVal} ${this.curropt} `;
        break;
      }
      case ('/'): {
        this.addtoLastTen(`${this.preVal} ${this.curropt} ${this.currentVal} =`);
        this.currentVal = (numcon(this.preVal) / numcon(this.currentVal)).toString();
        this.preVal = this.currentVal;
        this.displayEqv = `${this.preVal} ${this.curropt} `;
        break;
      }
      case ('x'): {
        this.addtoLastTen(`${this.preVal} ${this.curropt} ${this.currentVal} =`);
        this.currentVal = (numcon(this.preVal) * numcon(this.currentVal)).toString();
        this.preVal = this.currentVal;
        this.displayEqv = `${this.preVal} ${this.curropt} `;
        break;
      }
    }

  }


  addMemory(){
    if(this.memory && this.memory !== ''){
      this.lastsave.setMemory((numcon(this.memory) + numcon(this.currentVal)).toString());
    } else {
      this.lastsave.setMemory(this.currentVal);
    }
  }

  subMemory(){
    if(this.memory && this.memory !== ''){
      this.lastsave.setMemory((numcon(this.memory) - numcon(this.currentVal)).toString());
    } else {
      this.lastsave.setMemory(this.currentVal);
    }
  }

  memoryClear(){
    this.lastsave.setMemory('');
    this.memoArr = [];
    this.lastsave.memoarry.next(this.memoArr);
  }

  arrMemo(){
    if(this.memory && this.memory !== ''){
      this.memoArr.push(this.memory);
      this.lastsave.setMemory(this.currentVal);
      this.lastsave.memoarry.next(this.memoArr);
    } else {
      this.lastsave.setMemory(this.currentVal);
    }
  }

  memoRow(){
    this.currentVal = this.memory;
  }


  addtoLastTen(expQr){
    const addobj = {
      ex: expQr,
      res: this.currentVal
    };
    this.lastten.push(addobj);
  }

  clearhistory(){
    this.lastten =  [];
  }

}

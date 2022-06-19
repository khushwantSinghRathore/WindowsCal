import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {


  displayBtn = [
    [ '%','CE','C','X'],
    [ '1/x','x2','2√x','/'],
    [ '7','8','9','X'],
    [ '4','5','6','-'],
    [ '1','2','3','+'],
    [ '+/-', '0','.','=']
  ];

  constructor() { }

  ngOnInit() {
  }

}

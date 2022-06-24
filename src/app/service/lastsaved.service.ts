import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LastsavedService {

  memoryObj: BehaviorSubject<any> = new BehaviorSubject('');
  memoarry: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor() { }

  setMemory(obj){
    this.memoryObj.next(obj);
  }

  setMemoArry(arr){
    this.memoarry.next(arr);
  }

}

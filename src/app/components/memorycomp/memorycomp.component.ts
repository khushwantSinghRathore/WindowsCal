import { Component, OnInit } from '@angular/core';
import { LastsavedService } from 'src/app/service/lastsaved.service';

@Component({
  selector: 'app-memorycomp',
  templateUrl: './memorycomp.component.html',
  styleUrls: ['./memorycomp.component.scss'],
})
export class MemorycompComponent implements OnInit {


  memory: any;
  memoArr: any;
  nmArr: any[] = [];
  constructor(public lastsave: LastsavedService) {
  }

  ngOnInit() {
    this.lastsave.memoryObj.subscribe(res => this.memory = res);
    this.lastsave.memoarry.subscribe(res => this.memoArr = res);
  }

  clearMemory(){
    this.lastsave.setMemory('');
    this.lastsave.memoarry.next(this.nmArr);
  }

}

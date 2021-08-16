import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-number-and-location',
  templateUrl: './number-and-location.component.html',
  styleUrls: ['./number-and-location.component.css']
})
export class NumberAndLocationComponent implements OnInit {

  objectsQuantity= new FormControl(1);

  constructor() { }

  ngOnInit(): void {
  }

  increase(){
    if(this.objectsQuantity.value>0 && this.objectsQuantity.value<20){
      this.objectsQuantity.setValue(this.objectsQuantity.value+1);
    }
  }
  decrease(){
    if(this.objectsQuantity.value>1 && this.objectsQuantity.value<=20){
      this.objectsQuantity.setValue(this.objectsQuantity.value-1);
    }
  }

}

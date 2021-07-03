import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reminder-create',
  templateUrl: './reminder-create.component.html',
  styleUrls: ['./reminder-create.component.css']
})
export class ReminderCreateComponent implements OnInit {

  dateReminder = new FormControl("");
  alertMessage="";

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  createReminder(){

  }

  

}

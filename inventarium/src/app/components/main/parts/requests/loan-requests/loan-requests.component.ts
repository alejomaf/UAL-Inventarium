import { Component, OnInit } from '@angular/core';
import { faHouseUser, faMailBulk, faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-loan-requests',
  templateUrl: './loan-requests.component.html',
  styleUrls: ['./loan-requests.component.css']
})
export class LoanRequestsComponent implements OnInit {

  activos = faHouseUser;
  pendientes = faMailBulk;
  devolver = faStopwatch;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { faCube, faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  cubo = faCube;
  usuarios = faUsers;

  constructor() { }

  ngOnInit(): void {
  }

}

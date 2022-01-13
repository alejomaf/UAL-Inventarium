import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.css']
})
export class UserRequestsComponent implements OnInit {

  public users: Usuario[] = []

  constructor(private userS: UsersService) {
    this.userS.getUserRequests().subscribe(
      (res: any) => { this.users = res.data; },
      err => console.log('Error', err));
  }

  ngOnInit(): void {
  }

}

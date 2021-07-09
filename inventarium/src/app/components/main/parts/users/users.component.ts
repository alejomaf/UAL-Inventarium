import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public users: Usuario[] = []

  constructor(private userS: UsersService ) {
    this.userS.getUsers().subscribe(
      (res:any)=>{this.users = res.data; console.log(this.users);},
      err=>console.log('Error', err));
      
    }

  ngOnInit(): void {
  }

}

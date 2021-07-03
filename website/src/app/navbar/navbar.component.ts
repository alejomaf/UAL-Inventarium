import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userS: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.userS.resetToken();
    this.router.navigate(["/login"]);
  }

}

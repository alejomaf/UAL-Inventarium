import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from "jquery";
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public usuario?: Usuario

  constructor(private loginS: UserService, private router: Router) {
    if (!loginS.isLogged()) {
      this.logout();
      return;
    }
    loginS.getUser().subscribe(
      (res: any) => {
        if (res == null) {
          this.router.navigateByUrl("/");
          return;
        }
        this.usuario = res;
      }
    );
  }

  logout() {
    this.loginS.resetToken();
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
  }

  sidebarCollapse() {
    $('#sidebar, #content').toggleClass('active');
  }
}

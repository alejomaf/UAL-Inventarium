import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import $ from "jquery";
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';
import { RouterOutlet } from '@angular/router';
import { fader } from 'src/app/animations/main-animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [fader]
})
export class MainComponent implements OnInit {

  public usuario?: Usuario

  constructor(private loginS: UserService) {
    loginS.getUser().subscribe(
      (res: any) => {
        this.usuario = res;
      }
    );
  }

  ngOnInit(): void {
  }

  sidebarCollapse() {
    $('#sidebar, #content').toggleClass('active');
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData;
  }
}

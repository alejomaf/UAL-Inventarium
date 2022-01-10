import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faTh, faObjectGroup, faUsers, faLaptop, faDatabase, faUser, faCircle, faList, faSignOutAlt, faPaperPlane, faBars } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';
import $ from "jquery";

@Component({
  selector: 'app-vertical-navbar',
  templateUrl: './vertical-navbar.component.html',
  styleUrls: ['./vertical-navbar.component.css']
})
export class VerticalNavbarComponent implements OnInit {
  casa = faHome;
  anadir = faTh;
  grupo_objetos = faObjectGroup;
  solicitudes = faPaperPlane;
  usuarios = faUsers;
  ordenador = faLaptop;
  base_de_datos = faDatabase;
  usuario_imagen = faUser;
  circulo = faCircle;
  lista = faList;
  cerrar_sesion = faSignOutAlt;

  //Estados

  dashboard = false;
  add_object = false;
  objects = false;
  requests = false;
  users = false;
  devices = false;
  profile = false;
  my_loans = false;

  usuario?: Usuario

  constructor(private authS: AuthGuardService, private loginS: UserService, private router: Router) {
    this.usuario = authS.getCurrentUser();
    this.changeSelection(this.router.url.split("/")[1]);
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginS.resetToken();
    this.router.navigateByUrl("/login");
  }

  async selectState() {
    this.dashboard = false;
    this.add_object = false;
    this.objects = false;
    this.requests = false;
    this.users = false;
    this.devices = false;
    this.profile = false;
    this.my_loans = false;
  }

  async changeSelection(state: string) {
    if ($('#content').hasClass('active')) {
      $('#sidebar, #content').toggleClass('active');
      $('.sidebar-button').toggleClass('active');
    }
    await this.selectState();
    switch (state) {
      case "dashboard":
        this.dashboard = true;
        break;
      case "add-object":
        this.add_object = true;
        break;
      case "group_of_objects":
        this.objects = true;
        break;
      case "requests":
        this.requests = true;
        break;
      case "user-requests":
        this.requests = true;
        break;
      case "loan-requests":
        this.requests = true;
        break;
      case "users":
        this.users = true;
        break;
      case "configurations":
        this.devices = true;
        break;
      case "profile":
        this.profile = true;
        break;
      case "my-loans":
        this.my_loans = true;
        break;
      case "loans":
        this.my_loans = true;
        break;
      case "object":
        this.objects = true;
        break;
      case "user":
        this.users = true;
        break;
      case "loan":
        this.requests = true;
        break;
    }
  }

}

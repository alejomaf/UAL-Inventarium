import { Component, OnInit } from '@angular/core';
import { faHome, faTh, faObjectGroup, faUsers, faLaptop, faDatabase, faUser, faCircle, faList, faSignOutAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

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
  usuario = faUser;
  circulo = faCircle;
  lista = faList;
  cerrar_sesion = faSignOutAlt;
  
  constructor() { }

  ngOnInit(): void {
  }

}

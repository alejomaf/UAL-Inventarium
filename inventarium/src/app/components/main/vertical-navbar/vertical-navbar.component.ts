import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faTh, faObjectGroup, faUsers, faLaptop, faDatabase, faUser, faCircle, faList, faSignOutAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/interfaces/usuario';
import { UserService } from 'src/app/services/user.service';

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

  usuario?: Usuario

  constructor(private loginS: UserService, private router: Router) {
    if (!loginS.isLogged()) {
      this.logout();
      return;
    }
    loginS.getUser().subscribe(
      (res: any) => {
        this.usuario = res;
      }
    );
  }

  ngOnInit(): void {
  }

  logout() {
    this.loginS.resetToken();
    this.router.navigateByUrl("/login");
  }

}

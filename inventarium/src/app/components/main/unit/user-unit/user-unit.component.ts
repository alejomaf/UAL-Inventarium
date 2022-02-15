import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-unit',
  templateUrl: './user-unit.component.html',
  styleUrls: ['./user-unit.component.css']
})
export class UserUnitComponent implements OnInit {

  usuario?: Usuario
  user?: Usuario
  idUsuario?: number

  constructor(private userS: UsersService, private route: ActivatedRoute, private authS: AuthGuardService) {
    this.idUsuario = route.snapshot.params['id'];
    this.usuario = authS.getCurrentUser();

    userS.getUser(this.idUsuario!).subscribe(
      (res: any) => {
        this.user = res;
      }
    )
  }

  ngOnInit(): void {
  }


  darAlta() {
    this.userS.darDeAlta(this.idUsuario!).subscribe(
      (res: any) => {
        this.user!.rango = 1;
      }
    )
  }

  rechazarUsuario() {
    this.userS.darDeBaja(this.idUsuario!).subscribe(
      (res: any) => {
        this.user!.rango = -2;
      }
    );
  }
  convertirEnTecnico() {
    this.userS.convertirEnTecnico(this.idUsuario!).subscribe(
      (res: any) => {
        this.user!.rango = 0;
      }
    );
  }

}

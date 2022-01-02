import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-unit',
  templateUrl: './user-unit.component.html',
  styleUrls: ['./user-unit.component.css']
})
export class UserUnitComponent implements OnInit {

  user?: Usuario
  idUsuario?: number

  constructor(private userS: UsersService, private route: ActivatedRoute) {
    this.idUsuario = route.snapshot.params['id'];

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
        console.log(res);
      }
    );
  }

  rechazarUsuario() {
    this.userS.darDeBaja(this.idUsuario!).subscribe(
      (res: any) => {

      }
    );
  }

  desbanearUsuario() {
    this.userS.darDeAlta(this.idUsuario!).subscribe(
      (res: any) => {

      }
    );
  }

  convertirEnTecnico() {
    this.userS.convertirEnTecnico(this.idUsuario!).subscribe(
      (res: any) => {

      }
    );
  }

  eliminarDeTecnico() {
    this.userS.darDeAlta(this.idUsuario!).subscribe(
      (res: any) => {

      }
    );
  }

}

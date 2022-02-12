import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Prestado } from 'src/app/interfaces/prestado';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LoansService } from 'src/app/services/loans.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-my-loans',
  templateUrl: './my-loans.component.html',
  styleUrls: ['./my-loans.component.css']
})
export class MyLoansComponent implements OnInit {

  usuario?: Usuario;
  prestamos: Prestado[] = [];

  tipoSolicitud = 0;
  activas = false;
  pendientes = false;
  pasadas = false;
  rechazadas = false;
  solicitudes_activas = true;

  constructor(private route: ActivatedRoute, private loansS: LoansService, private authS: AuthGuardService, private usersS: UsersService) {
    if (route.snapshot.params['id'] == undefined) {
      this.usuario = this.authS.getCurrentUser();
      this.cargarPrestamos();
    } else usersS.getUser(route.snapshot.params['id']).subscribe(
      (res: any) => {
        this.usuario = res;
        this.cargarPrestamos();
      }
      //CASTEAR ERROR POR NO COGER BIEN UN USUARIO
    )

  }

  ngOnInit(): void {
  }


  cargarPrestamos() {
    this.loansS.getLoansByUser(this.usuario?.idUsuario!).subscribe(
      (res: any) => {
        if (res.data) {
          this.prestamos = res.data;
          this.procesarPrestamos();
        }
      }
    )
  }

  procesarPrestamos() {
    for (let i = 0; i < this.prestamos.length; i++) {
      if (this.prestamos[i].estado == 1) {
        this.activas = true;
        continue;
      }
      if (this.prestamos[i].estado == 0) {
        this.pendientes = true;
        continue;
      }
      if (this.prestamos[i].estado == -1) {
        this.pasadas = true;
        continue;
      }
      if (this.prestamos[i].estado == -2) {
        this.rechazadas = true;
        continue;
      }
    }
    if (this.activas == false && this.pendientes == true) this.tipoSolicitud = 0;

    this.tieneSolicitudesActivas();
  }

  tieneSolicitudesActivas() {
    if (!this.pendientes) return;
    for (let i = 0; i < this.prestamos.length; i++) {
      if (this.prestamos[i].Usuario_idUsuario == this.usuario!.idUsuario && this.prestamos[i].estado == 0) {
        this.solicitudes_activas = false;
        return;
      }
    }
    this.solicitudes_activas = true;
  }

}

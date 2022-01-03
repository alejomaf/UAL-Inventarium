import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Objeto } from 'src/app/interfaces/objeto';
import { Prestado } from 'src/app/interfaces/prestado';
import { Usuario } from 'src/app/interfaces/usuario';
import { LoansService } from 'src/app/services/loans.service';
import { ObjectsService } from 'src/app/services/objects.service';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/services/users.service';
import { VerticalNavbarComponent } from '../../vertical-navbar/vertical-navbar.component';

@Component({
  selector: 'app-loan-unit',
  templateUrl: './loan-unit.component.html',
  styleUrls: ['./loan-unit.component.css']
})
export class LoanUnitComponent implements OnInit {

  usuario?: Usuario
  idPrestamo?: number
  prestamo?: Prestado
  objeto_prestamo?: Objeto
  usuario_prestamo?: Usuario

  constructor(private route: ActivatedRoute, private loansS: LoansService, private loginS: UserService, private usersS: UsersService, private objectS: ObjectsService, private router: Router) {
    this.idPrestamo = route.snapshot.params['id'];

    loginS.getUser().subscribe(
      (res: any) => {
        this.usuario = res;
      }
    );
    this.loansS.getLoan(this.idPrestamo!).subscribe(
      (res: any) => {
        this.prestamo = res.data[0];
        if (res == null) return;
        this.usersS.getUser(this.prestamo!.Usuario_idUsuario).subscribe(
          (res: any) => {
            this.usuario_prestamo = res;
          }
        );
        this.objectS.getObject(this.prestamo!.Objeto_idObjeto).subscribe(
          (res: any) => {
            this.objeto_prestamo = res.data[0]
          }
        )
      }
    )
  }

  actualizarPrestamo() {
    this.loansS.getLoan(this.idPrestamo!).subscribe(
      (res: any) => {
        this.prestamo = res.data[0];
      }
    )
  }


  //Préstamo pasa al estado 1
  concederPrestamo() {
    this.loansS.grantLoan(this.idPrestamo!).subscribe(
      (res: any) => {
        this.actualizarPrestamo();
      }
    );
  }

  //Préstamo pasa al estado -1
  finalizarPrestamo() {
    this.loansS.endLoan(this.idPrestamo!).subscribe(
      (res: any) => {
        this.actualizarPrestamo();
      }
    );
  }

  //Préstamo pasa al estado -2
  rechazarPrestamo() {
    this.loansS.denyLoan(this.idPrestamo!).subscribe(
      (res: any) => {
        this.actualizarPrestamo();
      }
    );
  }

  //El préstamo se elimina
  cancelarPrestamo() {
    this.loansS.deleteLoan(this.idPrestamo!).subscribe(
      (res: any) => {
        this.actualizarPrestamo();
        this.router.navigateByUrl("/loans/" + this.objeto_prestamo?.idObjeto)
      }
    );
  }

  ngOnInit(): void {
  }

}

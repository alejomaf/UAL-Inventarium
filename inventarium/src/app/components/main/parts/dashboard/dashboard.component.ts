import { Component, OnInit } from '@angular/core';
import { faCube, faList, faObjectGroup, faPaperPlane, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { LoansService } from 'src/app/services/loans.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  cubo = faCube;
  usuarios = faUsers;
  solicitudes = faPaperPlane;
  my_loans = faList;
  grupo_objetos = faObjectGroup;
  usuario?: Usuario

  numero_solicitudes: number = 0

  constructor(private authS: AuthGuardService, private loansS: LoansService, private usersS: UsersService) {
    this.usuario = this.authS.getCurrentUser();

    if (this.usuario?.rango != 0) return;

    this.usersS.getUserRequests().subscribe(
      (res: any) => {
        if (res.data) {
          this.numero_solicitudes += res.data.length;
        }
      }
    )
    this.loansS.getPendingLoans().subscribe(
      (res: any) => {
        if (res.error) return;
        if (res.data) this.numero_solicitudes += res.data.length;
      }
    )
  }

  ngOnInit(): void {
  }

}

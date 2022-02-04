import { Component, OnInit } from '@angular/core';
import { faCube, faUsers } from '@fortawesome/free-solid-svg-icons';
import { LoansService } from 'src/app/services/loans.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  cubo = faCube;
  usuarios = faUsers;
  numero_solicitudes_usuarios: number = 0;
  numero_solicitudes_objetos: number = 0;

  constructor(private loansS: LoansService, private usersS: UsersService) {
    this.usersS.getUserRequests().subscribe(
      (res: any) => {
        if (res.data) {
          this.numero_solicitudes_usuarios += res.data.length;
        }
      }
    )
    this.loansS.getPendingLoans().subscribe(
      (res: any) => {
        if (res.error) return;
        if (res.data) this.numero_solicitudes_objetos += res.data.length;
      }
    )
  }

  ngOnInit(): void {
  }

}

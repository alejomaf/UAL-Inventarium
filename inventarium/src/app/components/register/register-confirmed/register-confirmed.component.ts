import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register-confirmed',
  templateUrl: './register-confirmed.component.html',
  styleUrls: ['./register-confirmed.component.css']
})
export class RegisterConfirmedComponent implements OnInit {

  idUsuario?: number
  token_number?: string
  number?: string

  calculando = false;
  fallo = false;

  constructor(private router: Router, private route: ActivatedRoute, private usersS: UsersService) {
    this.idUsuario = route.snapshot.params['id'];
    this.token_number = route.snapshot.params['token'];
    this.number = route.snapshot.params['number'];

    this.comprobarUsuario();
  }

  comprobarUsuario() {
    this.usersS.confirmarUsuario(this.token_number!, this.number!, this.idUsuario!).subscribe(
      (res: any) => {
        console.log(res);
        if (res.message) {
          this.calculando = true;
          setTimeout(() => { this.redirigir(); }, 10000);
        } else {
          this.fallo = true;
        }
      }
    )
  }

  redirigir() {
    this.router.navigateByUrl('/login');
  }

  ngOnInit(): void {
  }

}

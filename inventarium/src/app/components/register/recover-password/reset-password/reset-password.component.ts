import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password = new FormControl("");
  password2 = new FormControl("");
  alertEmail = "";
  hash = "";

  constructor(private route: ActivatedRoute, private userS: UsersService, private router: Router) {
    this.hash = route.snapshot.params['hash'];
  }

  ngOnInit(): void {
  }

  recoverPassword() {
    if (this.password.value == "" || this.password2.value == "") {
      this.alertEmail = "Escriba las nuevas contraseñas";
      return;
    }
    if (!(this.password.value === this.password2.value)) {
      this.alertEmail = "Las contraseñas no coinciden";
      return;
    }
    if (this.password.value.length < 8) {
      this.alertEmail = "La nueva contraseña debe tener una longitud mínima de 8 caracteres";
      return;
    }

    this.userS.solicitudCambiarContrasena(this.hash, this.password.value).subscribe(
      (res: any) => {
        if (res.error) {
          this.alertEmail = "No ha sido posible reestablecer la contraseña " + res.error;
          return;
        }
        this.router.navigateByUrl("/register-recover-finish");
      }
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  alertEmail = "";
  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private router: Router, private userS: UsersService) { }

  ngOnInit(): void {
  }

  recoverPassword() {
    if (!this.email.valid) {
      this.alertEmail = "Ingrese un email válido"
      return;
    }

    this.userS.solicitudRecuperarContrasena(this.email.value).subscribe(
      (res: any) => {
        this.router.navigateByUrl("/register-recover");
      }
    )


  }



}

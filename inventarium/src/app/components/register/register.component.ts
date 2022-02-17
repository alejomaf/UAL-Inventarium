import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = new FormControl("");
  password = new FormControl("");
  password2 = new FormControl("");
  email = new FormControl('', [
    Validators.required,
    Validators.email,
    Validators.pattern('^.+@(inlumine.ual.es|ual.es)$')
  ]);
  department = new FormControl(0);
  phone = new FormControl("",
    [
      Validators.required,
      Validators.pattern("[0-9 ]{9}")
    ]);

  alert = "";
  alertEmail = "";

  constructor(private router: Router, private userS: UsersService, private loginS: UserService) {
    if (this.loginS.getToken() != null) router.navigateByUrl("/dashboard");
  }

  ngOnInit(): void {
  }

  register() {
    if (this.name.value.length < 6) {
      this.alert = "Nombre muy corto";
      return;
    }
    if (this.password.value.length < 8) {
      this.alert = "Contraseña muy corta";
      return;
    }
    if (!(this.password.value === this.password2.value)) {
      this.alert = "Las contraseñas no coinciden";
      return;
    }
    if (!this.email.valid) {
      this.alert = "Ingresa un email válido";
      return;
    }
    if (!this.phone.valid) {
      this.alert = "Ingresa un número de teléfono válido";
      return;
    }

    let formData: any = new FormData()
    formData.append("nombre", this.name.value);
    formData.append("correoElectronico", this.email.value);
    formData.append("contrasena", this.password.value);
    formData.append("departamento", this.department.value);
    formData.append("telefono", this.phone.value);

    this.userS.addUser(formData).subscribe(
      (res: any) => {
        console.log(res);
        if (res.successfull) {
          this.router.navigateByUrl("/register-completed");
        } else if (res.error) {
          console.log(res.error)
          this.alertEmail = "El correo que ha intentado registrar ya existe"
        }
      }
    )
  }

}

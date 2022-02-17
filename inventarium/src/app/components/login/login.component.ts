import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl("");
  password = new FormControl("");
  error = false;

  constructor(private loginS: UserService, private router: Router, private authS: AuthGuardService) {
    if (this.loginS.getToken() != null) router.navigateByUrl("/dashboard");
  }

  ngOnInit(): void {
  }

  login() {
    if (this.email.value == "" || this.password.value == "") return;

    let formData = new FormData();
    formData.append("correoElectronico", this.email.value);
    formData.append("contrasena", this.password.value);

    this.loginS.login(formData).subscribe(
      (res: any) => {
        if (res.successfull) {
          this.loginS.setToken(res.successfull);
          this.router.navigateByUrl('/dashboard');
        } else if (res.error) {
          console.log(res.error);
          this.error = true;
        }
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private loginS: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.value == "" || this.password.value == "") return;

    let formData = new FormData();
    formData.append("correoElectronico", this.email.value);
    formData.append("contrasena", this.password.value);

    this.loginS.login(formData).subscribe(
      succesfull => {
        this.loginS.setToken(succesfull.toString())
        console.log(succesfull)
        this.router.navigateByUrl('/');
      },
      error => {
        console.log(error);
        error = true;
      }
    )
  }

}

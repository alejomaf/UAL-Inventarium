import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoginService } from "../../services/login.service";
import { User } from "../../interfaces/user"
import {Router} from "@angular/router";
import { UserService } from "../../services/user.service";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email = new FormControl("");
  password = new FormControl("");
  alertMessage = "";

  constructor(private loginService: LoginService, private router: Router, private userService : UserService) { }

  ngOnInit(): void {
  }

  login() {
    if (this.email.value == "") {
      this.alertMessage = "Debes indicar el email";
      return;
    }
    if (this.password.value == "") {
      this.alertMessage = "Debes indicar la contraseña";
      return;
    }
    let user: User = {email:this.email.value, password: this.password.value, idUser:null, name:null, user_token:"Auth_Key"}
    
    let login = this.loginService.login(user).subscribe((resp:any)=>{
      if(resp.error=="Error, email or password not found") {
        this.loginFail();
        return false;
      }
      this.userService.setToken(resp.successfull);
      this.router.navigateByUrl("");
      return true;
    });
  }

  loginFail(){
    this.alertMessage = "Contraseña o usuario incorrectos";
    this.email = new FormControl("");
    this.password = new FormControl("");
  }
}

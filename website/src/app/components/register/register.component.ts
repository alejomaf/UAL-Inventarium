import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = new FormControl("");
  email = new FormControl("");
  password = new FormControl("");
  passwordR = new FormControl("");
  alertMessage ="";

  constructor(private loginS: LoginService) { }

  ngOnInit(): void {
  }

  register(){
    if(this.username.value ==""){
      this.alertMessage="Write your username";
      return;
    }
    if(this.email.value ==""){
      this.alertMessage="Write your email adress";
      return;
    }
    if(this.password.value ==""){
      this.alertMessage="Write your password";
      return;
    }
    if(this.passwordR.value==""){
      this.alertMessage="Repeat your password";
      return;
    }
    if(this.password.value != this.passwordR.value){
      this.alertMessage="The passwords don't match";
      return;
    }
    let user: User = {name:this.username.value,email:this.email.value, password: this.password.value, idUser:null, user_token:"Auth_Key"}
    this.loginS.register(user).subscribe((resp:any)=>{this.alertMessage=resp.message; this.reiniciarAtributos();});
  }

  reiniciarAtributos(){
    this.username = new FormControl("");
    this.email = new FormControl("");
    this.password = new FormControl("");
    this.passwordR = new FormControl("");
  }
}

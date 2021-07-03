import { Injectable } from '@angular/core';

const user_token = "Auth_Key";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  setToken(token: string): void{
    localStorage.setItem(user_token, token);
  }

  isLogged(){
    return localStorage.getItem(user_token) != null;
  }

  getToken(){
    return localStorage.getItem(user_token);
  }

  resetToken(){
    localStorage.removeItem(user_token);
  }

  constructor() { }
}

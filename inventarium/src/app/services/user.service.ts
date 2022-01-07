import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

const usertoken = "Auth_Key";
const user_name = "Undefined";
const user_type = "0";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = "api/users/login"

  setToken(token: string): void {
    localStorage.setItem(usertoken, token);
  }

  setUser(user: Usuario): void {
    localStorage.setItem(user_name, String(user.nombre));
    localStorage.setItem(user_type, String(user.rango));
  }

  isTechnician(): boolean {
    return localStorage.getItem(usertoken) == "1";
  }

  isLogged() {
    return localStorage.getItem(usertoken) != null;
  }

  getToken() {
    return localStorage.getItem(usertoken)!;
  }

  resetToken() {
    localStorage.removeItem(usertoken);
  }

  login(loginInfo: FormData) {
    return this.http.post(this._url, loginInfo);
  }

  getUser() {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "usertoken": this.getToken() }));
    return this.http.get("api/users/mainUser", { headers: header });
  }

  constructor(private http: HttpClient) { }
}

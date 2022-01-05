import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

const user_token = "Auth_Key";
const user_name = "Undefined";
const user_type = "0";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _url = "api/users/login"

  setToken(token: string): void {
    localStorage.setItem(user_token, token);
  }

  setUser(user: Usuario): void {
    localStorage.setItem(user_name, String(user.nombre));
    localStorage.setItem(user_type, String(user.rango));
  }

  isTechnician(): boolean {
    return localStorage.getItem(user_token) == "1";
  }

  isLogged() {
    return localStorage.getItem(user_token) != null;
  }

  getToken() {
    return localStorage.getItem(user_token)!;
  }

  resetToken() {
    localStorage.removeItem(user_token);
  }

  login(loginInfo: FormData) {
    return this.http.post(this._url, loginInfo);
  }

  getUser() {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.getToken() }));
    return this.http.get("api/users/mainUser", { headers: header });
  }

  getUserLogin(): Observable<Usuario> {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.getToken() }));
    return this.http.get<Usuario>("api/users/mainUser", { headers: header });
  }

  constructor(private http: HttpClient) { }
}

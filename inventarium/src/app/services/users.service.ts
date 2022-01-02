import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _url = "api/users"

  constructor(private http: HttpClient, private userService: UserService) { }

  getUsers() {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.get(this._url, { headers: header });
  }

  getUser(idUser: number) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idUser, { headers: header });
  }

  addUser(user: FormData) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.post(this._url, user);
  }

  deleteUser(idUser: number) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idUser, { headers: header });
  }

  updateUser(user: FormData, idUsuario: number) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idUsuario, user, { headers: header });
  }

  darDeBaja(userId: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url + "/action/" + userId + "/0", null, { headers: header });
  }

  darDeAlta(userId: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post<any>(this._url + "/action/" + userId + "/1", null, { headers: header });
  }

  convertirEnTecnico(userId: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url + "/action/" + userId + "/2", null, { headers: header });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Usuario } from '../interfaces/usuario';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _url = "api/users"
  
  constructor(private http : HttpClient, private userService: UserService) { }

  getUsers(){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.get(this._url, { headers : header});
  }

  addUser(user: Usuario){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.post(this._url, user, { headers : header});
  }

  deleteUser(idUser: number){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.delete(this._url+"/"+idUser,{ headers : header});
  }

  updateUser(user: Usuario){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.put(this._url+"/"+user.idUsuario,user,{ headers : header});
  }
}

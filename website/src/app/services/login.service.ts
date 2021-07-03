import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  _url = "users/login"
  _urlR = "users" 

  constructor(private http: HttpClient) { }

  login(data: User) {
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":"Auth_Key"}));
    return this.http.post(this._url, data, {headers:header});
  }

  register(data: User){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":"AUTH_KEY"}));
    return this.http.post(this._urlR, data, { headers : header});
  }

}

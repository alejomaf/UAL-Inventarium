import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Library} from "../interfaces/library";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class BookshelfsService {
  _url = "bookshelfs"
  
  constructor(private http : HttpClient, private userService: UserService) { }

  getLibraries(){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.get(this._url, { headers : header});
  }

  addLibrary(data:Library){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.post(this._url, data, { headers : header});
  }

  deleteLibrary(idLibrary){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.delete(this._url+"/"+idLibrary, { headers : header });
  }
}

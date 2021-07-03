import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Book} from "../interfaces/book";
import { UserService } from "../services/user.service";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  _url = "books"
  
  constructor(private http : HttpClient, private userService: UserService) { }

  getBooks(idLibrary){
    let param = new HttpParams().set("idBookshelf", idLibrary)
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.get(this._url, { headers : header, params : param});
  }

  addBook(data:Book){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.post(this._url, data, { headers : header});
  }

  deleteBook(idBook){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.delete(this._url+"/"+idBook,{ headers : header});
  }

  updateBook(idBook,data){
    let header = new HttpHeaders(({'Content-Type': 'application/json',"user_token":this.userService.getToken()}));
    return this.http.put(this._url+"/"+idBook,data,{ headers : header});
  }
}

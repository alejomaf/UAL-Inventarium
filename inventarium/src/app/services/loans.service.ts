import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  _url = "api/prestado"

  constructor(private http: HttpClient, private userService: UserService) { }

  getLoans(idObjeto: number) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idObjeto, { headers: header });
  }

  addLoan(loan: FormData) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.post(this._url, loan);
  }

  deleteLoan(idLoan: number) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idLoan, { headers: header });
  }

  updateLoan(loan: FormData, idLoan: number) {
    let header = new HttpHeaders(({ 'Content-Type': 'application/json', "user_token": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idLoan, loan, { headers: header });
  }

}

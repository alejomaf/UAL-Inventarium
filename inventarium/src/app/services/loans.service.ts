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
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idObjeto, { headers: header });
  }

  getLoan(idLoan: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/id/" + idLoan, { headers: header });
  }

  addLoan(loan: FormData) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url, loan, { headers: header });
  }

  deleteLoan(idLoan: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idLoan, { headers: header });
  }

  updateLoan(loan: FormData, idLoan: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idLoan, loan, { headers: header });
  }

  grantLoan(idLoan: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url + "/action/" + idLoan + "/0", null, { headers: header });
  }

  endLoan(idLoan: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url + "/action/" + idLoan + "/1", null, { headers: header });
  }

  denyLoan(idLoan: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url + "/action/" + idLoan + "/2", null, { headers: header });
  }

  getActiveLoans() {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/type/0", { headers: header });
  }

  getPendingLoans() {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/type/1", { headers: header });
  }

  getExpiredLoans() {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/type/2", { headers: header });
  }



}

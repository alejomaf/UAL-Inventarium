import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationsService {
  _url = "api/configuracion"

  constructor(private http: HttpClient, private userService: UserService) { }

  getConfiguration(idObjeto: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idObjeto, { headers: header });
  }

  addConfiguration(configuracion: FormData) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.post(this._url, configuracion, { headers: header });
  }

  deleteConfiguration(idConfiguracion: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idConfiguracion, { headers: header });
  }

  updateConfiguration(configuracion: FormData, idConfiguracion: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idConfiguracion, configuracion, { headers: header });
  }

}

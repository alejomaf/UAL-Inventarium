import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { Objeto } from '../interfaces/objeto';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {
  _url = "api/objeto"

  constructor(private http: HttpClient, private userService: UserService) { }

  getObjects(idGrupoObjetos: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idGrupoObjetos, { headers: header });
  }

  getObject(idObjeto: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/id/" + idObjeto, { headers: header });
  }

  getObjectsByLocation(idUbicacion: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/location-id/" + idUbicacion, { headers: header });
  }

  addObject(objectGroup: FormData, idGrupoObjetos: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url + "/" + idGrupoObjetos, objectGroup, { headers: header });
  }

  deleteObject(idObjetos: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idObjetos, { headers: header });
  }

  updateObject(object: Objeto) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.put(this._url + "/" + object.idObjeto, object, { headers: header });
  }

  getObjectsWithConfiguration() {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/configs", { headers: header });
  }
}

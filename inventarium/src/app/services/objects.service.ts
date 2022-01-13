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
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idGrupoObjetos, { headers: header });
  }

  getAllObjects(idUbicacion: string, mejorasEquipo: string, codigo: string, observaciones: string, etiqueta: string, organizativa: string) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/", { headers: header, params: { 'idUbicacion': idUbicacion, 'mejorasEquipo': mejorasEquipo, 'codigo': codigo, 'observaciones': observaciones, 'etiqueta': etiqueta, 'organizativa': organizativa } });
  }

  getObject(idObjeto: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/id/" + idObjeto, { headers: header });
  }

  getObjectsByLocation(idUbicacion: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/location-id/" + idUbicacion, { headers: header });
  }

  addObject(objectGroup: FormData, idGrupoObjetos: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.post(this._url + "/" + idGrupoObjetos, objectGroup, { headers: header });
  }

  deleteObject(idObjetos: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idObjetos, { headers: header });
  }

  updateObject(idObjeto: number, objeto: FormData) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idObjeto, objeto, { headers: header });
  }

  getObjectsWithConfiguration() {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/configs", { headers: header });
  }
}

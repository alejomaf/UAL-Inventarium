import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { GrupoObjetos } from '../interfaces/grupoobjetos';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class GroupOfObjectsService {
  _url = "api/grupoobjetos"

  constructor(private http: HttpClient, private userService: UserService) { }

  getGroupOfObjects() {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url, { headers: header });
  }

  getGroupOfObjectsByType(type: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/type/" + type, { headers: header });
  }

  getGroupOfObject(idGrupoObjetos: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/id/" + idGrupoObjetos, { headers: header });
  }

  addGroupOfObject(objectGroup: FormData) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url, objectGroup, { headers: header });
  }

  deleteGroupOfObject(idGrupoObjetos: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idGrupoObjetos, { headers: header });
  }

  updateGroupOfObject(objectGroup: GrupoObjetos) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.put(this._url + "/" + objectGroup.idGrupoObjetos, objectGroup, { headers: header });
  }
}

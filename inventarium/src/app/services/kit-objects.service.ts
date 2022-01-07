import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class KitObjectsService {

  _url = "api/objetokit"

  constructor(private http: HttpClient, private userService: UserService) { }

  getKitObject(idGrupoObjetos: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idGrupoObjetos, { headers: header });
  }

  addKitObject(kit_object: FormData) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.post(this._url, kit_object, { headers: header });
  }

  deleteKitObject(idKitObject: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idKitObject, { headers: header });
  }

  updateKitObject(kit_object: FormData, idKitObject: number) {
    let header = new HttpHeaders(({ "usertoken": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idKitObject, kit_object, { headers: header });
  }
}

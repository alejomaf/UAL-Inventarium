import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UserService } from './user.service';
import { Ubicacion } from '../interfaces/ubicacion';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  _url = "api/ubicacion"

  constructor(private http: HttpClient, private userService: UserService) { }

  getLocation(idUbicacion: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url + "/" + idUbicacion, { headers: header });
  }

  getLocations() {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.get(this._url, { headers: header });
  }

  addLocation(location: FormData) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.post(this._url, location, { headers: header });
  }

  deleteLocation(idUbicacion: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.delete(this._url + "/" + idUbicacion, { headers: header });
  }

  updateLocation(location: FormData, idUbicacion: number) {
    let header = new HttpHeaders(({ "user_token": this.userService.getToken() }));
    return this.http.put(this._url + "/" + idUbicacion, location, { headers: header });
  }
}

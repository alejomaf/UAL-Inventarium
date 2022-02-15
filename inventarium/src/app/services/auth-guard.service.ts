import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { timer } from 'rxjs';
import { Usuario } from '../interfaces/usuario';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild, CanActivate {

  usuario?: Usuario

  constructor(private loginS: UserService, private router: Router, private route: ActivatedRoute) { }

  canActivateChild(): Promise<boolean> {
    return this.checkLoginPromise();
  }

  canActivate(): Promise<boolean> {
    return this.checkLoginPromise();
  }

  getCurrentUser(): Usuario {
    return this.usuario!;
  }

  checkLoginPromise(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      this.loginS.getUser()
        .toPromise()
        .then((res: any) => {
          if (res.error) {
            // Error
            this.logout();
            reject(false);
          }
          this.usuario = res;
          resolve(true);
        },
          err => {
            // Error
            this.logout();
            reject(false);
          }
        );
    });
    return promise;
  }

  logout() {
    this.loginS.resetToken();
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
  }
}

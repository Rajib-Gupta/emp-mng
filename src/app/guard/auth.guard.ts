import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
//import { AuthorizationService } from '../service/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    //private authorizationService: AuthorizationService,
    private routes: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
   // const allowedRoles = next.data.allowedRoles;
    //const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);
    
    if(this._authService.masterLoggedIn()){
      return true;
    }else{
      this.routes.navigate(['/signin']);
      return false;
    }


    // if (!isAuthorized) {
    //   this.routes.navigate(['accessdenied']);
    // }

    // return isAuthorized;
  }
  // canActivateChild(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   const allowedRoles = next.data.allowedRoles;
  //   const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

  //   if (!isAuthorized) {
  //     this.routes.navigate(['accessdenied']);
  //   }

  //   return isAuthorized;
  // }

  isSuper() {
    if (this._authService.masterLoggedIn() && this._authService.super()) {
      return true;
    }
    return false;
  }
}

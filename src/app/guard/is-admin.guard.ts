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
// import { AuthorizationService } from '../service/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
   // private authorizationService: AuthorizationService,
    private routes: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this._authService.admin()  ||  this._authService.super()) {
       

      // if(this._authService.admin() ) {
      //    this.routes.navigate(['/admin/dashboard'])
      //     return true;
      // } 
      // if( this._authService.super()){
      //      this.routes.navigate(['/supervisor/sup-profile'])
      //       return true;
      // }
       return true;
    } else {
          this.routes.navigate(['/signin'])
        return false;
    }

  }
}

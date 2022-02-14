import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import {Observable, of} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagmentGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check();
  }

  isLogged() {

    if(!localStorage.getItem('user_cinemaApp')){
      return false;
    }

    return true;
  }
  beAdminitrator(){
    if(!localStorage.getItem('user_cinemaApp')){
      return false;
    }
  }
  canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check();
  }

  private _check(): Observable<boolean> {
    console.log('verify...');
    const status = this.checkAuthStatus();

    if (!status) {
      this._router.navigate(['/auth/signin']);
    }

    return status;
  }

  checkAuthStatus(): Observable<boolean> {
    const user = this._authService.userLocalStorage;

    if (!user) {
      return of(false);
    }

    return of(true);
  }
}

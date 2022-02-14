import {Injectable} from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

import {Observable, of} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OfertasGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check();
  }

  canDeactivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._check();
  }

  private _check(): Observable<boolean> {
    console.log('verify...');
    const status = this.checkAuthStatus();

    if (!status) {
      this._router.navigate(['/auth/signin']);
      console.log('error linea 37');
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

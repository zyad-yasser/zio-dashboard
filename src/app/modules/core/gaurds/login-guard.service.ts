import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Location } from '@angular/common';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private localStorageService: LocalStorageService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const rememberMe = this.localStorageService.getData('user')
      ? true
      : false;
    return this.authService.getAccount()
    .pipe(
      tap((res) => {
        this.authService.setTokens(res, rememberMe);
        this.authService.setUserData(res, rememberMe);
        this.router.navigate([`admin/dashboard`]);
      }),
      mapTo(false),
      catchError(() => {
        this.authService.clearCredentials();
        this.authService.logout();
        return of(true);
      })
    );
  }
}

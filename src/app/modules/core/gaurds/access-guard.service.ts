import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { AuthService } from '../auth/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import { tap, mapTo, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class AccessGuardService implements CanActivate {
  group: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const rememberMe = this.localStorageService.getData('user')
      ? true
      : false;
    return this.authService.getAccount()
    .pipe(
      tap((res) => {
        this.authService.setTokens(res, rememberMe);
        this.authService.setUserData(res, rememberMe);
      }),
      mapTo(true),
      catchError(() => {
        this.authService.clearCredentials();
        this.authService.logout();
        this.router.navigate([`admin/login`]);
        return of(false);
      })
    );
  }
}



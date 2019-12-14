import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { AuthService } from '../auth/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
@Injectable({
  providedIn: 'root'
})

export class AccessGuardService implements CanActivate {
  group: string;
  constructor(
    private router: Router,
    private helper: HelperService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
    private authService: AuthService
    ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiresLogin = route.data.requiresLogin || false;
    const user = this.helper.getLoggedin();
    if (requiresLogin) {
      // Check that the user is logged in...
      let loggedin;
      if (this.authService.isLoggedin()) {
        loggedin = true;
      } else {
        this.router.navigate([`/${this.helper.lang}/login`]);
        loggedin = false;
      }
      return loggedin;
    }
    return true;
  }
}



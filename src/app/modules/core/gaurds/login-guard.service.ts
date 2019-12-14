import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate {
  constructor(private location: Location, private router: Router, private helper: HelperService, private authService: AuthService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedin()) {
      this.router.navigate([`/${this.helper.lang}/uploads`]);
      return false;
    }
    return true;
  }
}

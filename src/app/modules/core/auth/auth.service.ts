import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { serverip, baseUrl } from 'src/app/statics/constants';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { Observable } from 'rxjs';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import { LoginData } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { MapperService } from 'src/app/services/mappers/mapper.service';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private mapper: MapperService,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
  ) { }
  login(loginData: LoginData): Observable<any> {
    return this.http.post(
      `${ serverip + baseUrl + urls.auth.login}`,
      loginData
      );
  }
  getAccount(): Observable<any> {
    return this.http.get(
      `${ serverip + baseUrl + urls.auth.account}`,
      );
  }
  logout(): Observable<any> {
    return this.http.post(
      `${ serverip + baseUrl + urls.auth.logout}`,
      {}
      );
  }
  changePassword(password: any): Observable<any> {
    return this.http.put(
      `${ serverip + baseUrl + urls.auth.changePassword}`, password,
      );
  }
  getLoggedin(): User {
    const user: User = this.localStorageService.getData('loggedUser') ?
      this.localStorageService.getData('loggedUser') : this.sessionStorageService.getData('loggedUser');
    return user;
  }
  isSuperAdmin(): boolean {
    const user: User = this.getLoggedin();
    if (user && user.role === 'Admin') {
      return true;
    }
    return false;
  }
  isLoggedin(): boolean {
    const user: User = this.getLoggedin();
    if (user) {
      return true;
    }
    return false;
  }
  setCredentials(response: any, remember: boolean, roles: any[]) {
    const user: User = response;
    if (remember) {
      this.localStorageService.setData('loggedUser', user);
      this.localStorageService.setData('access_token', `Bearer ${user.token}`);
    } else {
      this.sessionStorageService.setData('loggedUser', user);
      this.sessionStorageService.setData('access_token', `Bearer ${user.token}`);
    }
  }

  setToken(response: any, remember: boolean) {
    if (remember) {
      this.localStorageService.setData('access_token', `Bearer ${response.token}`);
    } else {
      this.sessionStorageService.setData('access_token', `Bearer ${response.token}`);
    }
  }

  clearCredentials() {
    this.localStorageService.clearAll();
    this.sessionStorageService.clearAll();
  }

  getToken(): string {
    return this.localStorageService.getData('access_token') ?
      this.localStorageService.getData('access_token') : this.sessionStorageService.getData('access_token');
  }
}


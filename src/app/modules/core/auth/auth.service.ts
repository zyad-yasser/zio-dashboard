import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/statics/constants';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { Observable, of } from 'rxjs';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import { LoginData } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private sessionStorageService: SessionStorageService,
  ) {}

  public login(loginData: LoginData): Observable<any> {
    return this.http.post(`${ baseUrl + urls.auth.login }`, loginData, { observe: 'response' });
  }

  public getAccount(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.auth.account }`, { observe: 'response' });
  }

  public logout(): Observable<any> {
    return of(true);
    // return this.http.post(`${ baseUrl + urls.auth.logout }`, {});
  }

  public changePassword(password: any): Observable<any> {
    return this.http.put(`${ baseUrl + urls.auth.changePassword }`, password);
  }

  public getLoggedin(): User {
    const user: User = this.localStorageService.getData('user') || this.sessionStorageService.getData('user');
    return user;
  }

  public isSuperAdmin(): boolean {
    const user = this.getLoggedin();
    return user && user.isSuperAdmin
      ? true
      : false;
  }

  public isLoggedin(): boolean {
    const user: User = this.getLoggedin();
    return user
      ? true
      : false;
  }

  public setUserData(response: any, remember: boolean): void {
    const user: User = response.body;
    if (remember) {
      this.localStorageService.setData('user', user);
    } else {
      this.sessionStorageService.setData('user', user);
    }
  }

  public setTokens(response: any, remember: boolean): void {
    const authToken = response.headers.get('Authorization');
    const refreshToken = response.headers.get('X-Refresh-Token');
    if (remember) {
      this.localStorageService.setData('authToken', authToken);
      this.localStorageService.setData('refreshToken', refreshToken);
    } else {
      this.sessionStorageService.setData('authToken', authToken);
      this.sessionStorageService.setData('refreshToken', refreshToken);
    }
  }

  public clearCredentials(): void {
    this.localStorageService.clearAll();
    this.sessionStorageService.clearAll();
  }

  public getTokens(): any {
    const authToken = this.localStorageService.getData('authToken') || this.sessionStorageService.getData('authToken');
    const refreshToken = this.localStorageService.getData('refreshToken') || this.sessionStorageService.getData('refreshToken');
    return authToken && refreshToken
      ? { authToken, refreshToken }
      : null;
  }
}


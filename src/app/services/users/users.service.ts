import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverip, baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';
import { Observable, forkJoin } from 'rxjs';
import { UserAccount } from 'src/app/models/user-account';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  constructor(private http: HttpClient) {}

  public getRoles(): Observable<any> {
    return this.http.get(
      `${serverip + baseUrl + urls.users.types}`,
    );
  }

  public delete(userId: string): Observable<any> {
    return this.http.delete(`${ serverip + baseUrl + urls.users.delete }/${userId}`);
  }

  public getOne(userId: string): Observable<UserAccount> {
    return this.http.get<UserAccount>(`${ serverip + baseUrl + urls.users.getOne }/${userId}`);
  }

  public create(user: UserAccount): Observable<UserAccount> {
    return this.http.post<UserAccount>(`${ serverip + baseUrl + urls.users.create }`, user);
  }

  public update(user: UserAccount): Observable<UserAccount> {
    return this.http.put<UserAccount>(`${ serverip + baseUrl + urls.users.update }/${user.id}`, user);
  }

  public resetPassword(userId: string): Observable<any> {
    return this.http.post<any>(`${ serverip + baseUrl + urls.users.resetPassword }/${userId}`, {});
  }

  public list(): Observable<[UserAccount, any]> {
    const getUsers = this.http.get<UserAccount>(`${ serverip + baseUrl + urls.users.list}`);
    const getRoles = this.http.get<any>(`${ serverip + baseUrl + urls.users.types}`);
    return forkJoin([getUsers, getRoles]);
  }
}

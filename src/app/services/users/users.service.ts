import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../statics/constants';
import { urls } from '../../statics/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.users.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.users.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.users.create }`, user);
  }

  public update(user: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.users.update }/${id}`, user);
  }

  public resetPassword(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.users.resetPassword }/${id}`, {});
  }

  public toggleActivity(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.users.toggleActivity }/${id}`, {});
  }
}

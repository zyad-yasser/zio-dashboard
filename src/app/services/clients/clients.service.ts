import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../statics/constants';
import { urls } from '../../statics/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  ClientsService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.clients.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.clients.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.clients.create }`, user);
  }

  public update(client: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.clients.update }/${id}`, client);
  }

  public toggleVisibility(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.clients.toggleVisibility }/${id}`, {});
  }
}

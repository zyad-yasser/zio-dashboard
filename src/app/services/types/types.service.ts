import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../statics/constants';
import { urls } from '../../statics/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  TypesService {
  constructor(private http: HttpClient) { }

  public getOneById(id: string): Observable<any> {
    return this.http.get(`${ baseUrl + urls.types.oneId }/${id}`);
  }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.types.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.types.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.types.create }`, user);
  }

  public update(client: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.types.update }/${id}`, client);
  }

  public toggleVisibility(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.types.toggleVisibility }/${id}`, {});
  }
}

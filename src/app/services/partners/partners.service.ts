import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})
export class PartnersService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.partners.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.partners.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.partners.create }`, user);
  }

  public update(partner: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.partners.update }/${id}`, partner);
  }

  public toggleVisibility(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.partners.toggleVisibility }/${id}`, {});
  }
}

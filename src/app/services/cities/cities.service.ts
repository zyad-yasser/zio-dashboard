import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.cities.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.cities.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.cities.create }`, user);
  }

  public update(city: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.cities.update }/${id}`, city);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.categories.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.categories.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.categories.create }`, user);
  }

  public update(category: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.categories.update }/${id}`, category);
  }

  public toggleVisibility(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.categories.toggleVisibility }/${id}`, {});
  }
}

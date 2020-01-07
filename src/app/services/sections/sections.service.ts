import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from '../../statics/constants';
import { urls } from '../../statics/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class  SectionsService {
  constructor(private http: HttpClient) { }

  public getOneByType(type: string): Observable<any> {
    return this.http.get(`${ baseUrl + urls.sections.oneType }/${type}`);
  }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.sections.list }`);
  }

  public findCreateOrUpdate(type: string, data: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.sections.findCreateOrUpdate }/${type}`, data);
  }
}

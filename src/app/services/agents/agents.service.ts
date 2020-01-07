import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {
  constructor(private http: HttpClient) { }

  public list(): Observable<any> {
    return this.http.get(`${ baseUrl + urls.agents.list }`);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(`${ baseUrl + urls.agents.delete }/${id}`);
  }

  public create(user: any): Observable<any> {
    return this.http.post(`${ baseUrl + urls.agents.create }`, user);
  }

  public update(agent: any, id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.agents.update }/${id}`, agent);
  }

  public toggleVisibility(id: string): Observable<any> {
    return this.http.put(`${ baseUrl + urls.agents.toggleVisibility }/${id}`, {});
  }
}

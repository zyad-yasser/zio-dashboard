import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { baseUrl } from 'src/app/statics/constants';
import { urls } from 'src/app/statics/urls';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  constructor(private http: HttpClient) { }

  public list(number: number): Observable<any> {
    return this.http.get(`${baseUrl + urls.media.list + number}`);
  }
}

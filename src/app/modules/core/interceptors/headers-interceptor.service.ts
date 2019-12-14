import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse,
  HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptorService implements HttpInterceptor {

  constructor() { }

  addHeaders(req: HttpRequest<any>): HttpRequest<any> {
    if (!req.headers.keys().length) {
      return req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      });
    }
    return req;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |
  HttpResponse<any> | HttpUserEvent<any>> {
    return next.handle(this.addHeaders(req));
  }

}

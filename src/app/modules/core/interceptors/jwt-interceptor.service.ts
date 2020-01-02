import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class JWTInterceptorService implements HttpInterceptor {
  public reqCounter = 0;

  constructor(
    private injector: Injector,
    private router: Router,
    private toastr: ToastrService,
    private loader: LoaderService
  ) {}

  private reqCounterDecrease(): void {
    this.reqCounter -= 1;
  }

  private addToken(req: HttpRequest<any>, tokens: any): HttpRequest<any> {
    const { authToken, refreshToken } = tokens;
    return req.clone({
      setHeaders: {
        Authorization: authToken,
        'X-Refresh-Token': refreshToken
      }
    });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    const authService = this.injector.get(AuthService);
    const tokens = authService.getTokens();
    this.reqCounter += 1;
    if (tokens) {
      const request = this.addToken(req, tokens);
      return next
        .handle(request)
        .pipe(
          catchError((error) => {
            return observableThrowError(error);
          })
        )
        .pipe(
          finalize(() => {
            this.reqCounterDecrease();
          })
        );
    }
    return next.handle(req).pipe(
      finalize(() => {
        this.reqCounterDecrease();
      })
    );
  }
}

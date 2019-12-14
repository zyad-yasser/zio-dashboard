import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse,
  HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/services/helpers/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { toastrConfig } from 'src/app/statics/constants';

@Injectable({
  providedIn: 'root'
})
export class JWTInterceptorService implements HttpInterceptor {
  public reqCounter = 0;

  constructor(
    private injector: Injector,
    private router: Router,
    private helper: HelperService,
    private translate: TranslateService,
    private toastr: ToastrService,
    private dialogRef: MatDialog,
    private loader: LoaderService
  ) { }

  private reqCounterDecrease(): void {
    this.reqCounter -= 1;
    if (this.reqCounter === 0) {
      this.loader.hide();
    }
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: token } });
  }

  showLoader(req: HttpRequest<any>): boolean {
    return ! req.url.includes('logs');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent |
  HttpResponse<any> | HttpUserEvent<any>> {
    const authService = this.injector.get(AuthService);
    if (this.showLoader(req)) {
      this.loader.show();
      this.reqCounter += 1;
    }
    if (authService.getToken()) {
      return next.handle(this.addToken(req, authService.getToken())).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse) {
            switch ((error as HttpErrorResponse).status) {
              case 400:
                return this.handle400Error(req, error);
              case 401:
                return this.handle401Error(req, next);
              default:
                return observableThrowError(error);
            }
          }
          this.logoutUser();
          return observableThrowError(error);
        })).pipe(
          finalize(() => {
            if (this.showLoader(req)) {
              this.reqCounterDecrease();
            }
          })
        );
    }
    return next.handle(req).pipe(
      finalize(() => {
        if (this.showLoader(req)) {
          this.reqCounterDecrease();
        }
      })
    );
  }

  handle400Error(req, error) {
    return observableThrowError(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    // handle refresh token code here
    const authService = this.injector.get(AuthService);
    this.dialogRef.closeAll();
    authService.clearCredentials();
    this.router.navigate([`/${this.helper.lang}/login`]);
    this.toastr.clear();
    if (this.reqCounter <= 1) {
      const message = this.translate.instant('TOASTR.SESSION_TIMEOUT');
      this.toastr.error(message, null, toastrConfig);
    }
    return observableThrowError('');
  }

  logoutUser() {
    // Route to the login page
    const authService = this.injector.get(AuthService);
    authService.clearCredentials();
    this.router.navigate([`/${this.helper.lang}/login`]);
    return observableThrowError('');
  }
}

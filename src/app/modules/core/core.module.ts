import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { JWTInterceptorService } from './interceptors/jwt-interceptor.service';
import { HeadersInterceptorService } from './interceptors/headers-interceptor.service';


@NgModule({
  imports: [],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptorService,
      multi: true
    }],
})

export class CoreModule {}

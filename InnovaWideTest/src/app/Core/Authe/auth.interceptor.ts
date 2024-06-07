import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private cookieService: CookieService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');
    const tenant = this.cookieService.get('tenent');

    let headers = req.headers;
    if (tenant) {
      headers = headers.set('Tenant', tenant);
    }
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    const clonedRequest = req.clone({ headers });
    return next.handle(clonedRequest);
  }
}

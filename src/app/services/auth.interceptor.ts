import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('Auth Interceptor...');
    const skipIntercept = req.headers.has('skip');

    if (skipIntercept) {
      req = req.clone({
        headers: req.headers.delete('skip'),
      });
      return next.handle(req);
    } else {
      const accessToken = environment.CUSTOMER_APP_ACCESS_TOKEN;
      if (accessToken) {
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
        });
        return next.handle(cloned);
      } else {
        return next.handle(req);
      }
    }
  }
}

import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TokenStorageService} from '../services/token-storage.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _router: Router,
              private _tokenStorage: TokenStorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this._tokenStorage.getToken();
    if (token != null) {
      req = req.clone({setHeaders: {'Authorization': 'Bearer ' + token}});
    }
    return next.handle(req).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do stuff with response if you want
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              if (this._router.url.indexOf('login') == -1) { // this._router.url.length > 2
                const login = 'login';
                this._router.navigate([login], {queryParams: {returnUrl: this._router.url}});
              } else {
                console.log('already return', this._router.url);
              }
            } else if (err.status === 403) {
              console.log('access denied', err);
            }
          }
        }
      )
    );
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

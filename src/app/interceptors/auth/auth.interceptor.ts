import { inject } from '@angular/core';
import { AuthService } from './../../services/auth/auth.service';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // 刷新 Token
        return handle401Error(req, next);
      }
      return throwError(() => error);
    })
  );
};

function handle401Error(req: HttpRequest<any>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
  const localStorageService = inject(LocalStorageService);
  const route = inject(Router);

  return authService.refreshCookie().pipe(
    switchMap(() => {
      return next(req);
    }),
    catchError((refreshError) => {
      localStorageService.removeItem('user-profile');
      route.navigate(['/']);
      return throwError(() => refreshError);
    })
  );
}

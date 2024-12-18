import { HttpInterceptorFn } from '@angular/common/http';
import { Observable, from, switchMap, tap } from 'rxjs';
import { HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';

let csrfToken: string | null = null;

const csrfTokenUrl = `${environment.apiUrl}/csrf/csrf-token`;

// 獲取 CSRF Token 的函數
const fetchCsrfToken = async (): Promise<void> => {
  if (csrfToken) return;

  try {
    const response = await fetch(csrfTokenUrl);
    if (!response.ok) {
      throw new Error('無法獲取 CSRF Token: ' + response.statusText);
    }
    const data = await response.json();
    csrfToken = data.csrfToken;
  } catch (error) {
    console.error('無法獲取 CSRF Token:', error);
  }
};

// 攔截器：適配 HttpInterceptorFn 的簽名
export const csrfInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next
): Observable<HttpEvent<unknown>> => {
  return from(fetchCsrfToken()).pipe(
    switchMap(() => {
      const clonedReq = csrfToken
        ? req.clone({ setHeaders: { 'X-CSRF-Token': csrfToken } })
        : req;

      // 使用 `next` 作為函數調用
      return next(clonedReq);
    })
  );
};

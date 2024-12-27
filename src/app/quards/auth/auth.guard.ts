import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(() => true), // 如果請求成功，允許訪問
    catchError(() => {
      // 如果請求失敗，跳轉到登入頁
      router.navigate(['/login']);
      return of(false);
    })
  );
};

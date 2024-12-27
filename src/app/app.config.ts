import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { csrfInterceptor } from './interceptors/csrf/csrf.interceptor';
import { authInterceptor } from './interceptors/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([authInterceptor, csrfInterceptor]) // 註冊 CSRF 攔截器
    ),
    provideRouter(routes),
  ],
};

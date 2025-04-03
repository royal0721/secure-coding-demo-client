import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { csrfInterceptor } from './interceptors/csrf/csrf.interceptor';
import { authInterceptor } from './interceptors/auth/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { credentialsInterceptor } from './interceptors/credentials/credentials.inteceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([credentialsInterceptor, authInterceptor, csrfInterceptor]) // 註冊 CSRF 攔截器
    ),
    provideRouter(routes), provideAnimationsAsync(),
  ],
};

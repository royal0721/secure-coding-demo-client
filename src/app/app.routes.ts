import { Routes } from '@angular/router';
import { PostListComponent } from '../app/components/post-list/post-list.component';
import { CsrfPageComponent } from './components/csrf-page/csrf-page.component';
import { authGuard } from './quards/auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 默認重定向
  {
    path: '',
    component: AuthLayoutComponent, // 登入布局
    children: [
      { path: 'login', component: LoginComponent }, // 登入頁面
    ],
  },
  {
    path: '',
    component: MainLayoutComponent, // 主布局
    children: [
      {
        path: 'post-list',
        component: PostListComponent,
        canActivate: [authGuard], // 保護路由
      },
      {
        path: 'csrf-page',
        component: CsrfPageComponent,
        canActivate: [authGuard], // 保護路由
      },
    ],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }, // 默認重定向
];

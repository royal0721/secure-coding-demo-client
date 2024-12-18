import { Routes } from '@angular/router';
import { PostListComponent } from '../app/components/post-list/post-list.component';
import { CsrfPageComponent } from './components/csrf-page/csrf-page.component';

export const routes: Routes = [
  {
    path: 'csrf-page',
    component: CsrfPageComponent,
  },
  {
    path: 'post-list', // 定義路徑
    component: PostListComponent, // 對應的組件
  },
  {
    path: '', // 默認路徑
    redirectTo: '/post-list',
    pathMatch: 'full',
  },
];

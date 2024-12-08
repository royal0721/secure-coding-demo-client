import { Routes } from '@angular/router';
import { PostListComponent } from '../app/components/post-list/post-list.component';

export const routes: Routes = [
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

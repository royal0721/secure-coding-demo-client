import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApi = `${environment.apiUrl}/auth`;
  constructor(private http: HttpClient, private router: Router) {}

  // 註冊
  register(username: string, password: string, role: string) {
    return this.http.post(
      `${this.authApi}/register`,
      {
        username,
        password,
      },
      {
        withCredentials: true, // 確保請求攜帶HttpOnly cookie
      }
    );
  }

  // 登入
  login(username: string, password: string) {
    return this.http.post(
      `${this.authApi}/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true, // 確保請求攜帶HttpOnly cookie
      }
    );
  }

  refreshCookie(): Observable<any> {
    return this.http.post(`${this.authApi}/refresh`, {}); // 發送 POST 請求
  }

  // 檢查用戶是否已登入
  isLoggedIn(): Observable<any> {
    return this.http.get(`${this.authApi}/posts`); // 發送到受保護的路徑
  }
}

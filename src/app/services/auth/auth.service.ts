import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // 註冊
  register(username: string, password: string, role: string) {
    return this.http.post(`${environment.apiUrl}/auth/register`, {
      username,
      password,
      role,
    });
  }

  // 登入
  login(username: string, password: string) {
    return this.http.post(`${environment.apiUrl}/auth/login`, {
      username,
      password,
    });
  }

  // 保存 Token
  saveToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  // 獲取 Token
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  // 獲取用戶角色
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  }

  // 是否已登入
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // 登出
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authApi = `${environment.apiUrl}/auth`;
  constructor(private readonly http: HttpClient) { }

  // 註冊
  register(username: string, password: string, roleId: number) {
    const body: any = {
      username,
      password,
      roleId,
    };

    return this.http.post(
      `${this.authApi}/register`,
      body
    );
  }

  // 登入
  login(username: string, password: string) {
    return this.http.post(
      `${this.authApi}/login`,
      {
        username,
        password,
      }
    );
  }

  refreshCookie(): Observable<any> {
    return this.http.post(`${this.authApi}/refresh`, {}); // 發送 POST 請求
  }

  // 檢查用戶是否已登入
  isLoggedIn(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/auth/status`,);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.authApi}/logout`, {});
  }
}

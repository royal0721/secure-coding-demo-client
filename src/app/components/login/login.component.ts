import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null; // 錯誤訊息顯示

  private authService = inject(AuthService);
  private router = inject(Router);

  // 處理登入
  onSubmit() {
    if (!this.username || !this.password) {
      this.errorMessage = '請輸入帳號與密碼'; // 檢查輸入
      return;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.router.navigate(['/post-list']); // 登入成功後跳轉到 post-list
      },
      error: (err) => {
        this.errorMessage = err.error?.message || '登入失敗，請稍後再試'; // 顯示後端返回的錯誤
      },
    });
  }
}

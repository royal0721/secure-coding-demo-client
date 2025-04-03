import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTooltipModule, MatIconModule, MatButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  registerForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    roleId: ['', Validators.required],
  });

  successMessage = '';
  errorMessage = '';

  onSubmit() {
    if (this.registerForm.invalid) return;

    const { username, password, roleId } = this.registerForm.value;
    const parsedRoleId = parseInt(roleId as string, 10);

    this.authService.register(username!, password!, parsedRoleId).subscribe({
      next: (message) => {
        this.successMessage = '註冊成功！請前往登入';
        this.errorMessage = '';
        this.registerForm.reset();
        setTimeout(() => {
          this.router.navigate(['/login']); // 導向 login 頁
        }, 1500); // 延遲 1.5 秒，顯示成功訊息
      },
      error: (err) => {
        this.errorMessage = err.error?.message ?? '註冊失敗，請稍後再試';
        this.successMessage = '';
      },
    });
  }

  goBack() {
    this.router.navigate(['/login']); // 導向 login 頁
  }
}
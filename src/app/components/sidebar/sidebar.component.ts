import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AccessibleClickDirective } from '../../directives/accessible-click/accessible-click.directive';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AccessibleClickDirective],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isCollapsed = false;
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('登出失敗：', err);
      }
    });
  }
}

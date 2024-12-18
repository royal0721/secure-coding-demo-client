import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  isCollapsed = false;

  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }
}

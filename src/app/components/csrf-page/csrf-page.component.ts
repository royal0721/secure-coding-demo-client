import { Component } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-csrf-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './csrf-page.component.html',
  styleUrl: './csrf-page.component.scss',
})
export class CsrfPageComponent {
  result: string | null = null;

  constructor(private readonly postService: PostService) { }

  // 調用受保護的端點
  callProtectedEndpoint(): void {
    this.postService.callProtectedEndpoint().subscribe({
      next: (response) => {
        this.result = response.message;
      },
      error: (err) => {
        console.error('訪問受保護的端點失敗:', err);
        this.result = '訪問失敗';
      },
    });
  }
}

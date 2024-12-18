import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import DOMPurify from 'dompurify';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [PostService],
})
export class PostListComponent implements OnInit {
  posts: any[] = [];
  newPostContent = '';
  result: string | null = null;

  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.loadPosts();
  }

  // 獲取所有留言
  private loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (error) => console.error('無法載入留言:', error),
    });
  }

  // 提交新留言
  onAddPost(): void {
    if (this.isContentInvalid(this.newPostContent)) {
      alert('留言內容不得為空');
      return;
    }

    const sanitizedContent = this.sanitizeContent(this.newPostContent);
    this.postService.createPost(sanitizedContent).subscribe({
      next: (newPost) => this.handlePostAdded(newPost),
      error: (error) => this.handleAddPostError(error),
    });
  }

  // 驗證留言內容
  private isContentInvalid(content: string): boolean {
    return !content.trim();
  }

  // 處理新留言
  private handlePostAdded(newPost: any): void {
    this.posts.push(newPost);
    this.newPostContent = '';
  }

  // 處理新增留言錯誤
  private handleAddPostError(error: any): void {
    console.error('新增留言失敗:', error);
    alert('無法新增留言，請稍後再試');
  }

  // 清理輸入內容
  sanitizeContent(content: string): string {
    return DOMPurify.sanitize(content);
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../services/post/post.service';
import DOMPurify from 'dompurify';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PermissionService } from '../../services/permission/permission.service';
import { MatDialog } from '@angular/material/dialog';
import { EditPostDialogComponent } from '../edit-post-dialog/edit-post-dialog.component';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  providers: [PostService],
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  newPostContent = '';
  result: string | null = null;

  private postService = inject(PostService);
  private permissionService = inject(PermissionService);
  private dialog = inject(MatDialog);

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

  onDeletePost(id: number) {
    if (confirm('確定要刪除這篇貼文嗎？')) {
      this.postService.deletePost(id).subscribe({
        next: () => {
          this.posts = this.posts.filter(p => p.id !== id);
          alert('成功刪除此貼文');
        },
        error: (err) => {
          console.error('刪除失敗：', err);
          alert('無法刪除此貼文，可能已被移除或您沒有權限。');
        }
      });
    }
  }

  onEditPost(post: Post) {
    this.permissionService.checkPermission('update_post').subscribe({
      next: (canEdit) => {
        if (canEdit) {
          this.openDialog(post);
        } else {
          this.handleNoPermission();
        }
      },
      error: () => {
        alert('無法檢查權限，請稍後再試');
      },
    });
  }

  private openDialog(post: Post) {
    const dialogRef = this.dialog.open(EditPostDialogComponent, {
      data: { post: { ...post } }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.handlePostUpdate(post);
      }
    });
  }

  private handleNoPermission() {
    alert('您沒有權限編輯這篇貼文');
  }

  private handlePostUpdate(post: any) {
    this.postService.getPostById(post.id).subscribe({
      next: (updatedPost) => {
        this.updatePostInList(post, updatedPost);
      },
      error: () => {
        alert('取得更新後貼文失敗');
      },
    });
  }

  private updatePostInList(post: any, updatedPost: any) {
    const index = this.posts.findIndex((p) => p.id === post.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  }


  // 定義 post interface
  trackByPostId(index: number, post: any) {
    return post.id;
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
    alert('無法新增貼文，可能內容不符合規則或您沒有權限。');
  }

  // 清理輸入內容
  sanitizeContent(content: string): string {
    return DOMPurify.sanitize(content);
  }
}

import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { PostService } from '../../services/post/post.service';
import { AutoFocusDirective } from '../../directives/auto-focus/auto-focus.directive';

@Component({
  selector: 'app-edit-post-dialog',
  templateUrl: './edit-post-dialog.component.html',
  styleUrls: ['./edit-post-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatError,
    AutoFocusDirective],
})
export class EditPostDialogComponent {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly postService: PostService,
    private readonly dialogRef: MatDialogRef<EditPostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { post: any }
  ) {
    this.form = this.fb.group({
      name: [data.post.name, [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const updatedName = this.form.value.name;

    this.postService.updatePost(this.data.post.id, updatedName).subscribe({
      next: () => this.dialogRef.close(true), // 回傳 true 代表更新成功
      error: () => alert('更新失敗，請稍後再試'),
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}

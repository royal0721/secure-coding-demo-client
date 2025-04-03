import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly postUrl = `${environment.apiUrl}/posts`;
  private readonly protectedUrl = `${environment.apiUrl}/csrf/protected-endpoint`;

  constructor(private http: HttpClient) { }


  // 獲取所有留言
  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postUrl);
  }

  getPostById(id: number) {
    return this.http.get<Post>(`${this.postUrl}/${id}`, {});
  }

  // 新增留言
  createPost(content: string): Observable<any> {
    return this.http.post(this.postUrl, { name: content });
  }

  callProtectedEndpoint(): Observable<any> {
    return this.http.post(this.protectedUrl, { data: '測試數據' });
  }

  deletePost(id: number) {
    return this.http.delete(`${this.postUrl}/${id}`, {});
  }

  updatePost(id: number, name: string) {
    return this.http.put(`${this.postUrl}/${id}`, { name }, {});
  }

}

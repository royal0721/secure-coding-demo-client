import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postUrl = `${environment.apiUrl}/posts`;
  private protectedUrl = `${environment.apiUrl}/csrf/protected-endpoint`;

  constructor(private http: HttpClient) { }


  // 獲取所有留言
  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.postUrl);
  }

  getPostById(id: number) {
    return this.http.get<any>(`${this.postUrl}/${id}`, {
      withCredentials: true,
    });
  }

  // 新增留言
  createPost(content: string): Observable<any> {
    return this.http.post(this.postUrl, { name: content });
  }

  callProtectedEndpoint(): Observable<any> {
    return this.http.post(this.protectedUrl, { data: '測試數據' });
  }

  deletePost(id: number) {
    return this.http.delete(`${this.postUrl}/${id}`, {
      withCredentials: true, // 如果你有用 cookie-based auth，要加這個
    });
  }

  updatePost(id: number, name: string) {
    return this.http.put(`${this.postUrl}/${id}`, { name }, {
      withCredentials: true
    });
  }

}

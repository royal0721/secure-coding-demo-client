import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private readonly http: HttpClient) { }

  checkPermission(permission: string): Observable<boolean> {
    const params = new HttpParams().set('permission', permission);
    return this.http
      .get<any>(`${environment.apiUrl}/permissions/check`, {
        params,
      })
      .pipe(map(res => res.isPermitted));
  }
}
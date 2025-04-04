import { TestBed } from '@angular/core/testing';

import { PermissionService } from './permission.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], });
    service = TestBed.inject(PermissionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

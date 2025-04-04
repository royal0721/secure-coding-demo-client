import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPostDialogComponent } from './edit-post-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditPostDialogComponent', () => {
  let component: EditPostDialogComponent;
  let fixture: ComponentFixture<EditPostDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditPostDialogComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { post: { name: '測試貼文' } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditPostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

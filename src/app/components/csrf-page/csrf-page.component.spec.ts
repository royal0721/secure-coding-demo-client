
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CsrfPageComponent } from './csrf-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CsrfPageComponent', () => {
  let component: CsrfPageComponent;
  let fixture: ComponentFixture<CsrfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CsrfPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CsrfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

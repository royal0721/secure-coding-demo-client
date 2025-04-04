import { AutoFocusDirective } from './auto-focus.directive';
import { ElementRef } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';

describe('AutoFocusDirective', () => {
  it('should call focus on nativeElement after view init (with setTimeout)', fakeAsync(() => {
    const mockFocus = jasmine.createSpy('focus');
    const mockElementRef = {
      nativeElement: {
        focus: mockFocus
      }
    };

    const directive = new AutoFocusDirective(mockElementRef as ElementRef);
    directive.ngAfterViewInit();

    tick();
    expect(mockFocus).toHaveBeenCalled();
  }));
});

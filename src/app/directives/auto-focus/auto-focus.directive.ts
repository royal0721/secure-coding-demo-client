import { Directive, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements AfterViewInit {
  constructor(private readonly el: ElementRef) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 0); // 確保 DOM 渲染完成
  }
}
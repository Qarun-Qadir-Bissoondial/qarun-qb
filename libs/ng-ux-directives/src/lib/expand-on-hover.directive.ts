import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[expand-on-hover]'
})
export class ExpandOnHoverDirective {
  @Input('expand-on-hover') multiplier: string;
  constructor(private el: ElementRef) {}
  @HostListener('mouseenter') expand() {
    this.setScale(this.multiplier || '1.5');
  }
  @HostListener('mouseleave') contract() {
    this.setScale('1');
  }

  setScale(scale: string | number) {
    this.el.nativeElement.style.transform = `scale(${scale})`;
  }
}

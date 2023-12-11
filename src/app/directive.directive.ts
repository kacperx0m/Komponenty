import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appDirective]'
})
export class DirectiveDirective {





  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.setFontWeight('bold');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setFontWeight('normal')
  }


  private setFontWeight(weight: string) {
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', weight);
  }
}

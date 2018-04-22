import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
  AfterViewInit,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'ion-marquee',
  template: `
      <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class IonMarquee implements AfterViewInit {
  _direction: string;
  timer: any;

  @Input() speed: any;

  @Input()
  get direction(): any {
    return this._direction;
  }
  set direction(val) {
    this._direction = val;
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (this.direction === 'vertical') {
      this.scrollVertical();
    } else {
      this.scrollHorizontal();
    }
  }

  scrollHorizontal() {
    const nativeElement = this.element.nativeElement;
    const innerBlock = document.createElement('div');
    innerBlock.innerHTML = nativeElement.innerText;
    this.renderer.setStyle(nativeElement, 'display', 'block'); // 内联对象需加
    this.renderer.setStyle(nativeElement, 'word-break', 'keep-all');
    this.renderer.setStyle(nativeElement, 'white-space', 'nowrap');
    this.renderer.setStyle(nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(nativeElement, 'height', '24px');
    this.renderer.setStyle(innerBlock, 'position', 'absolute');
    nativeElement.innerHTML = '';
    this.renderer.appendChild(nativeElement, innerBlock);

    if (innerBlock.offsetWidth <= nativeElement.offsetWidth) {
      return;
    }

    innerBlock.innerHTML += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    innerBlock.innerHTML += innerBlock.innerHTML;

    this.timer = setInterval(function() {
      innerBlock.style.left = innerBlock.offsetLeft - 1 + 'px';
      if (innerBlock.offsetLeft < -innerBlock.offsetWidth / 2) {
        innerBlock.style.left = '0';
      } else if (innerBlock.offsetLeft > 0) {
        innerBlock.style.left = -innerBlock.offsetWidth / 2 + 'px';
      }
    }, this.speed);
  }

  scrollVertical() {
    const nativeElement = this.element.nativeElement;
    const iBox = document.createElement('div');
    this.renderer.setStyle(iBox, 'width', '100%');
    this.renderer.setStyle(iBox, 'width', '100%');
    this.renderer.setStyle(iBox, 'overflow', 'hidden');
    this.renderer.setAttribute(iBox, 'id', 'marqueeBoxA');
    iBox.innerHTML = nativeElement.innerHTML;

    const iBox2 = iBox.cloneNode(true);
    this.renderer.setAttribute(iBox2, 'id', 'marqueeBoxB');

    nativeElement.innerHTML = '';
    this.renderer.appendChild(nativeElement, iBox);
    this.renderer.appendChild(nativeElement, iBox2);

    this.renderer.setStyle(nativeElement, 'display', 'block');
    this.renderer.setStyle(nativeElement, 'overflow', 'hidden');
    this.timer = setInterval(() => {
      if (nativeElement.clientHeight - nativeElement.scrollTop <= 0) {
        nativeElement.scrollTop =
          nativeElement.offsetHeight - nativeElement.scrollTop + 1;
      } else {
        nativeElement.scrollTop++;
      }
    }, this.speed);
  }

  stop() {
    clearInterval(this.timer);
  }
}

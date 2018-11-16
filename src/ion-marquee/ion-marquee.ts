import {
  Component,
  Input,
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
  _text: string;
  _timer: any;
 
  @Input() speed: any;

  // only support horizontal scroll
  @Input()
  set text(val) {
    this._text = val;
    if (this.direction !== 'vertical') {
      this.scrollHorizontal();
    }
  }

  @Input()
  get direction(): any {
    return this._direction;
  }
  set direction(val) {
    this._direction = val;
  }

  constructor(private element: ElementRef, private renderer: Renderer2) {
    if (!String.prototype.repeat) {
      String.prototype.repeat = function(count) {
        'use strict';
        if (this == null) {
          throw new TypeError("can't convert " + this + ' to object');
        }
        let str = '' + this;
        count = +count;
        if (count != count) {
          count = 0;
        }
        if (count < 0) {
          throw new RangeError('repeat count must be non-negative');
        }
        if (count == Infinity) {
          throw new RangeError('repeat count must be less than infinity');
        }
        count = Math.floor(count);
        if (str.length == 0 || count == 0) {
          return '';
        }
        if (str.length * count >= 1 << 28) {
          throw new RangeError(
            'repeat count must not overflow maximum string size'
          );
        }
        let rpt = '';
        for (;;) {
          if ((count & 1) == 1) {
            rpt += str;
          }
          count >>>= 1;
          if (count == 0) {
            break;
          }
          str += str;
        }
        return rpt;
      };
    }
  }

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
    innerBlock.innerHTML = this._text;
    this.renderer.setStyle(nativeElement, 'display', 'block'); // for inline elements
    this.renderer.setStyle(nativeElement, 'word-break', 'keep-all');
    this.renderer.setStyle(nativeElement, 'white-space', 'nowrap');
    this.renderer.setStyle(nativeElement, 'overflow', 'hidden');
    this.renderer.setStyle(innerBlock, 'position', 'absolute');
    nativeElement.innerHTML = '';
    this.renderer.appendChild(nativeElement, innerBlock);

    if (innerBlock.offsetWidth <= nativeElement.offsetWidth) {
      return;
    }

    innerBlock.innerHTML += '&nbsp;'.repeat(5);
    innerBlock.innerHTML += innerBlock.innerHTML;

    this._timer = setInterval(function() {
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
    this._timer = setInterval(() => {
      if (nativeElement.clientHeight - nativeElement.scrollTop <= 0) {
        nativeElement.scrollTop =
          nativeElement.offsetHeight - nativeElement.scrollTop + 1;
      } else {
        nativeElement.scrollTop++;
      }
    }, this.speed);
  }

  stop() {
    clearInterval(this._timer);
  }
}

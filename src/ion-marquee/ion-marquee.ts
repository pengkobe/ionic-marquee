import {
  Component,
  ChangeDetectorRef,
  Input,
  Output,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

import { Platform } from 'ionic-angular';

@Component({
  selector: 'ion-marquee',
  template: `
    <div></div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    /** COMPONENT_STYLE */
  ],
})
export class IonMarquee implements OnInit {
  constructor() {}

  ngOnInit() {}
}

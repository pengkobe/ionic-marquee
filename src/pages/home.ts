import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage implements OnInit {
  direction = 'vertical';
  horizontalText = `this is the text to show scroll horizontal, 
  and default is scroll horizontal. you don't need to set the direction`;
  constructor(public navCtrl: NavController) {}

  ngOnInit() {
    setTimeout(() => {
      this.horizontalText = `<span style="color:red">this is the text to show that text could be refreshed. 
      but this feature support horizontal scroll only!</span>`;
    }, 5000);
  }
}

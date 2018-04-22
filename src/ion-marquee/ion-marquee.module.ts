import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { IonMarquee } from './ion-marquee';
import { IonicModule } from 'ionic-angular';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [IonMarquee],
  exports: [IonMarquee],
  entryComponents: [IonMarquee],
})
export class IonMarqueeModule {}

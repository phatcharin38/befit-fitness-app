import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisbookPage } from './regisbook';

@NgModule({
  declarations: [
    RegisbookPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisbookPage),
  ],
})
export class RegisbookPageModule {}

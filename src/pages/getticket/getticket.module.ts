import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetticketPage } from './getticket';

@NgModule({
  declarations: [
    GetticketPage,
  ],
  imports: [
    IonicPageModule.forChild(GetticketPage),
  ],
})
export class GetticketPageModule {}

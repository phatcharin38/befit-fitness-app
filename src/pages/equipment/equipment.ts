import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { BookingPage } from '../booking/booking';
/**
 * Generated class for the EquipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment',
  templateUrl: 'equipment.html',
})
export class EquipmentPage {

  pushHomePage: any;
  pushProfilePage: any;
  pushBookingPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pushProfilePage = ProfilePage;
    this.pushBookingPage = BookingPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentPage');
  }

  goToHome() {
    this.navCtrl.push(this.pushHomePage);
  }

  goToProfile() {
    this.navCtrl.push(this.pushProfilePage);
  }

  goToBooking(id) {
    console.log("ID : " + id);
    this.navCtrl.push(this.pushBookingPage,{id : "" + id});
  }
  
}

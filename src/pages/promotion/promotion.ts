import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetticketPage } from '../getticket/getticket';
/**
 * Generated class for the PromotionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-promotion',
  templateUrl: 'promotion.html',
})
export class PromotionPage {
  pushGetticketPage: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pushGetticketPage = GetticketPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionPage');
  }

  getTicket(){
    this.navCtrl.push(this.pushGetticketPage);
  }

}

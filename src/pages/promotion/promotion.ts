import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GetticketPage } from '../getticket/getticket';
import { HttpClient } from '@angular/common/http';
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
  promotions : any;
  rating : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    this.pushGetticketPage = GetticketPage;
    this.setRatingPromotion();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PromotionPage');   
    this.setAllPromotion();
  }

  setAllPromotion(){
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllPromotion.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        this.promotions = data;
        console.log(this.promotions)
      }
    );
  }

  setRatingPromotion(){
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectRatingFitness.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        this.rating = data;
        console.log(this.rating)
      }
    );
  }


  getTicket(id){
    this.navCtrl.push(this.pushGetticketPage,{id:id});
  }

}

import { Component } from '@angular/core';
import { App } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PromotionPage } from '../promotion/promotion';
import { MapPage } from '../map/map';
import { SearchPage } from '../search/search';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LoadingPage } from '../loading/loading';
import { RatingPage } from '../rating/rating';
/** 
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  pushPromotionPage: any;
  pushMapPage: any;
  pushSearchPage: any;
  json:any;
  name:String = "";
  address:String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private httpClient:HttpClient,private storage: Storage,public appCtrl: App) {
    this.pushPromotionPage = PromotionPage;
    this.pushMapPage = MapPage;
    this.pushSearchPage = SearchPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');

    this.storage.get('member').then((val) => {

      this.json = JSON.stringify({ member: val});
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectProfileApplication.php?data=' + this.json;
      console.log(url);
      this.httpClient.get(url)
        .subscribe(
        (data: any) => {
          console.log(data)
          
          this.name = data[0].firtname + " " + data[0].lastname;
          this.address = data[0].address;
                   
        }
        );
    });
  }

  goToPromotion(){
    this.navCtrl.push(this.pushPromotionPage);
  }

  goToSearch(){
    this.navCtrl.push(this.pushSearchPage);
  }

  goToSearchEqipment(){
    console.log('goToSearchEqipment');
  }

  goToSearchMap(){
    this.navCtrl.push(this.pushMapPage);
  }

  goToSearchBooking(){
    console.log('goToSearchBooking');
  }

  goToViewBooking(){
    console.log('goToViewBooking');
  }

  goToRating(){
    this.navCtrl.push(RatingPage);
  }

  goToReport(){
    console.log('goToReport');
  }

  logout(){
    this.appCtrl.getRootNav().setRoot(LoadingPage);
  }

}

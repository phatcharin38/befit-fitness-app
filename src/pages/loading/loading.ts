import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController} from 'ionic-angular';
import { PincodePage } from '../pincode/pincode';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
/**
 * Generated class for the LoadingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-loading',
  templateUrl: 'loading.html',
})
export class LoadingPage {
  pushPincodePage: any;
  pushRegisterPage: any;
  member: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController,
              private storage: Storage) {

    this.pushPincodePage = PincodePage;
    this.pushRegisterPage = RegisterPage;
    this.storage.get('member').then((val) => {
      this.member = val;
    }); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadingPage');
    
      // let loading = this.loadingCtrl.create({
      //   content: 'Please wait...'
      // });
    
      // loading.present();
    
      setTimeout(() => {
        console.log(this.member);
        if(this.member != null){
          this.navCtrl.push(this.pushPincodePage,{id:2});
        }else{
          this.navCtrl.push(this.pushRegisterPage);
        }       
      }, 1000);

      
  }

}

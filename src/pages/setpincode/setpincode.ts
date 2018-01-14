import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PincodePage } from '../pincode/pincode';

/**
 * Generated class for the SetpincodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-setpincode',
  templateUrl: 'setpincode.html',
})
export class SetpincodePage {
  passcode: string = "";
  pushPincodePage: any;
  json : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pushPincodePage = PincodePage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SetpincodePage');
  }

  add(value) {
    if (this.passcode.length != 4) {
      this.passcode = this.passcode + value;
    } else {
      // this.passcode = this.passcode + value;
      console.log(this.passcode);
      console.log("Login");
      this.navCtrl.push(this.pushPincodePage,{id:1,code:this.passcode});     
    }
  }

  delete() {
    if (this.passcode.length > 0) {
      this.passcode = this.passcode.substring(0, this.passcode.length - 1);
      // console.log(this.passcode);
    }
  }

}

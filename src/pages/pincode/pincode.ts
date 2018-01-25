import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SetpincodePage } from '../setpincode/setpincode';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the PincodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
})
export class PincodePage {
  passcode: string = "";
  pushTabsPage: any;
  pushSetpincodePage: any;
  id: any;
  code: any;
  json: any;
  member: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
    private storage: Storage, public alertCtrl: AlertController) {
    this.pushTabsPage = TabsPage;
    this.pushSetpincodePage = SetpincodePage;
    this.id = this.navParams.get('id');
    this.code = this.navParams.get('code');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PincodePage');
  }

  add(value) {
    if (this.passcode.length != 4) {
      this.passcode = this.passcode + value;
    }
    if(this.passcode.length == 4){
      if (this.id == 1) {
        if (this.passcode == this.code) {
          //set pincode
          this.storage.get('member').then((val) => {
            this.member = val;
            console.log('Your ID Member : ', this.member);

            this.json = JSON.stringify({ member: val, pincode: this.passcode });
            var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setPincodeApplication.php?data=' + this.json;
            console.log(url);
            this.httpClient.get(url)
              .subscribe(
              (data: any) => {
                console.log(data)
                if (data.result === 'SUCCESS') {
                  let alert = this.alertCtrl.create({
                    title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                    subTitle: 'สำเร็จ',
                  });
                  alert.present();
                  this.navCtrl.push(this.pushTabsPage);
                } else {
                  let alert = this.alertCtrl.create({
                    title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                    subTitle: 'รหัสไม่ถูกต้อง',
                  });
                  alert.present();
                }
              }
              );
          });
          
        } else {
          this.navCtrl.push(this.pushSetpincodePage);
        }
      } else if (this.id == 2) {
        //login pincode
        this.storage.get('member').then((val) => {
          this.member = val;
          // console.log('Your ID Member : ', this.member);
          this.json = JSON.stringify({ member: val, pincode: this.passcode });
          var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/checkPincodeApplication.php?data=' + this.json;
          console.log(url);
          this.httpClient.get(url)
            .subscribe(
            (data: any) => {
              console.log(data)
              if (data.result === 'SUCCESS') {
                // let alert = this.alertCtrl.create({
                //   title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                //   subTitle: 'สำเร็จ',
                // });
                // alert.present();
                this.navCtrl.push(this.pushTabsPage);
              } else {
                let alert = this.alertCtrl.create({
                  title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                  subTitle: 'รหัสไม่ถูกต้อง',
                });
                alert.present();
                this.passcode = "";
              }
            }
            );
        });

      }

    }
  }

  delete() {

    if (this.passcode.length > 0) {
      this.passcode = this.passcode.substring(0, this.passcode.length - 1);
      // console.log(this.passcode);
    }
  }


}

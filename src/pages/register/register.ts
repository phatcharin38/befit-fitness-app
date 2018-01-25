import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SetpincodePage } from '../setpincode/setpincode';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  date: any;
  income: any;
  signup: any;
  genderTxt: any;
  d: any = "";
  m: any = "";
  y: any = "";
  m2: any = "";
  i: any = 0;
  n: any = 0;
  month: any = [];
  myDate: any;
  pushPincode: any;
  json: any;
  idcard: any;
  tel: any;
  response: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private storage: Storage, private httpClient: HttpClient) {
    this.date = new Date().toISOString();
    this.pushPincode = SetpincodePage;
    this.month = [[{ id: 1 }, { name: 'January' }], [{ id: 2 }, { name: 'February' }],
    [{ id: 3 }, { name: 'March' }], [{ id: 4 }, { name: 'April' }],
    [{ id: 5 }, { name: 'May' }], [{ id: 6 }, { name: 'June' }],
    [{ id: 7 }, { name: 'July' }], [{ id: 8 }, { name: 'August' }],
    [{ id: 9 }, { name: 'September' }], [{ id: 10 }, { name: 'October' }],
    [{ id: 11 }, { name: 'November' }], [{ id: 12 }, { name: 'December' }]];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.income = 10000;
    this.goNext(1);
  }

  setIncome(income2) {
    this.income = income2;
  }

  goNext(id) {
    if (id == 1) {
      this.signup = 'profile';
    } else if (id == 2) {
      this.signup = 'other';
    } else if (id == 3) {
      this.signup = 'condition';
    } else if (id == 4) {
      // this.storage.set('member', 'Member0001');
      // this.navCtrl.push(this.pushPincode);
    }

  }

  goNextPincode(idcard, gender, firstname, lastname, date, age, tel, address, income, weight, height, disese, email, condition) {
    console.log(idcard);
    if(idcard != undefined && gender != undefined && firstname != undefined  && lastname != undefined  && date != undefined  && age != undefined  && tel != undefined  && address != undefined && income != undefined  && weight != undefined  && height != undefined  && disese != undefined  && email  != undefined){
      if (condition == true) {
        this.json = JSON.stringify({
          "idCard": "" + idcard,
          "gender": "" + gender,
          "firtname": "" + firstname,
          "lastname": "" + lastname,
          "birthday": "" + this.date,
          "age": "" + age,
          "address": "" + address,
          "tel": "" + tel,
          "weight": "" + weight,
          "height": "" + height,
          "disease": "" + disese,
          "email": "" + email,
          "income": "" + income,
          "accept": "" + condition,
          "pincode": ""
        });
        console.log(this.json);

        var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/registerApplication.php?data=' + this.json;
        console.log(url);
        this.httpClient.get(url)
          .subscribe(
          (data: any) => {
            console.log(data)
            if (data.result === 'SUCCESS') {
              console.log(data.member)
              this.storage.set('member', data.member);
              this.navCtrl.push(this.pushPincode);
            } else {
              let alert = this.alertCtrl.create({
                title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                subTitle: 'บันทึกไม่สำเร็จ',
                cssClass: 'alertDanger'
              });
              alert.present();
            }
          }
          );


      } else {
        let alert = this.alertCtrl.create({
          title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
          subTitle: 'กรุณากดยอมรับเงื่อนไข',
        });
        alert.present();

      }
    } else {
      let alert = this.alertCtrl.create({
        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
        subTitle: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      });
      alert.present();
    }
  }

  changDate(date) {
    //2017-12-21T18:56:02.814Z
    this.n = date.indexOf("T");
    this.y = date.substring(0, this.n).split('-')[0];
    this.m = date.substring(0, this.n).split('-')[1];
    this.d = date.substring(0, this.n).split('-')[2];
    // console.log(this.d);
    for (this.i = 0; this.i < 12; this.i++) {
      if (this.m == this.month[this.i][0].id) {
        this.m2 = this.month[this.i][1].name;
      }
    }
    // this.myDate = "" + this.d + " " + this.m2 + " " + this.y;
    this.myDate = this.y + " " + this.m + " " + this.d;
    console.log(this.myDate);
  }

  setIdCard(event: any) {
    if (event.target.value.length == 1) {
      this.idcard = this.idcard + "-"
    } else if (event.target.value.length == 6) {
      this.idcard = this.idcard + "-"
    } else if (event.target.value.length == 12) {
      this.idcard = this.idcard + "-"
    } else if (event.target.value.length == 15) {
      this.idcard = this.idcard + "-"
    }
  }

  setTel(event: any) {
    if (event.target.value.length == 2) {
      this.tel = this.tel + "-"
    }
  }



}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  myDate: any;
  date2: any;
  month: any = [];
  d: any = "";
  m: any = "";
  y: any = "";
  m2: any = "";
  i: any = 0;
  n: any = 0;
  date: any
  histoty: any = [{}];
  json: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private httpClient: HttpClient, private storage: Storage) {

    var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    this.date2 = new Date().toLocaleDateString('en-EN', options);
    this.date = this.date2.split(" ")[1].split(",")[0].split("/")[2] + "-";

    if (this.date2.split(" ")[1].split(",")[0].split("/")[0] <= 9) {
      this.date += "0" + this.date2.split(" ")[1].split(",")[0].split("/")[0] + "-";
    } else {
      this.date += this.date2.split(" ")[1].split(",")[0].split("/")[0] + "-";
    };

    if (this.date2.split(" ")[1].split(",")[0].split("/")[1] <= 9) {
      this.date += "0" + this.date2.split(" ")[1].split(",")[0].split("/")[1];
    } else {
      this.date += this.date2.split(" ")[1].split(",")[0].split("/")[1];
    }
    this.month = [[{ id: 1 }, { name: 'January' }], [{ id: 2 }, { name: 'February' }],
    [{ id: 3 }, { name: 'March' }], [{ id: 4 }, { name: 'April' }],
    [{ id: 5 }, { name: 'May' }], [{ id: 6 }, { name: 'June' }],
    [{ id: 7 }, { name: 'July' }], [{ id: 8 }, { name: 'August' }],
    [{ id: 9 }, { name: 'September' }], [{ id: 10 }, { name: 'October' }],
    [{ id: 11 }, { name: 'November' }], [{ id: 12 }, { name: 'December' }]];

    this.changDate(this.date);
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');

  }

  setData() {
    this.storage.get('member').then((val) => {
      this.json = JSON.stringify({ member: val, date: this.myDate });
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectBookingHistory.php?data=' + this.json;
      console.log(url);
      this.httpClient.get(url)
        .subscribe(
        (data: any) => {
          this.histoty = data;
          console.log(this.histoty)
        }
        );
    });
  }


  goToDelete(id) {
    let confirm = this.alertCtrl.create({
      title: 'Comfirm Delete?',
      message: 'You want to cancel this booked',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();

  }

  changDate(date) {
    console.log(date);
    this.myDate = date.split('T')[0];
    this.setData();
  }

  delete(id) {
    this.json = JSON.stringify({ id: id });
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/deleteBookingHistory.php?data=' + this.json;
    console.log(url);
    this.httpClient.get(url)
      .subscribe(
      (data: any) => {
        console.log(data)
        if (data == 'SUCCESS') {
          this.setData();
        } else {
          console.log(data);
        }
      });

  }

  cancle(id) {
    this.json = JSON.stringify({ id: id });
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/cancleBookingHistory.php?data=' + this.json;
    console.log(url);
    this.httpClient.get(url)
      .subscribe(
      (data: any) => {
        console.log(data)
        if (data == 'SUCCESS') {
          this.setData();
        } else {
          console.log(data);
        }
      });

  }

}

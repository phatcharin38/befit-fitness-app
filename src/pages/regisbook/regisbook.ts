import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BookingPage } from '../booking/booking';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the RegisbookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-regisbook',
  templateUrl: 'regisbook.html',
})
export class RegisbookPage {

  id: any;
  fitness: any;
  equipment: { name: String, value: string }[] = [];
  codeFitness: any;
  booking: any;
  timeS: string[] = [];
  timeE: string[] = [];
  date: any;
  day: any;
  date2: any;
  timeStart: any = "";
  timeEnd: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
     private storage: Storage, public alertCtrl: AlertController) {

    this.id = this.navParams.get('id');
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectEditFitness.php?id="' + this.id + '"';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
      console.log(data)
      this.fitness = data;
      this.codeFitness = data[0].code_fitness;
      this.booking = data[0].booking_system
      console.log(this.booking);
      this.setEquipment();

    }
    );

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisbookPage');
  }

  setEquipment() {
    var url2 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectAllEquipment.php?codeFitness="' + this.codeFitness + '"';
    console.log(url2);
    this.httpClient.get(url2).subscribe((data: any) => {
      // console.log(data)
      for (var i in data) {
        for (var k = 1; k <= data[i].amount; k++) {
          this.equipment.push({
            name: "" + data[i].name + " " + k,
            value: k + ";" + data[i].type_equipment
          });
        }
      }
      console.log(this.equipment);
    }
    );
  }

  dataEquipment(val) {
    console.log(val);
    var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    this.date = new Date().toLocaleDateString('en-EN', options);
    this.day = this.date.split(" ")[0].split(",")[0];
    console.log("this.timeS");
    if (this.day == 'Sat' || this.day == 'Sun') {
      console.log(this.fitness[0].open_holiday + "-" + this.fitness[0].close_holiday);
      var hourS = parseInt(this.fitness[0].open_holiday.split(":")[0]);
      var minuteS = parseInt(this.fitness[0].open_holiday.split(":")[1]);
      var hourE = parseInt(this.fitness[0].close_holiday.split(":")[0]);
      var minuteE = parseInt(this.fitness[0].close_holiday.split(":")[1]);
      console.log(hourS + "  " + hourE);
      var j = 0;
      for (var i = hourS; i <= hourE; i++) {
        if (i == hourS) {
          if (minuteS > 0) {
            this.timeS.push(i + ":30");
          } else {
            // this.timeS.push(i + ":00");
            this.timeS.push(i + ":30");
          }

        } else if (i == hourE) {
          this.timeS.push(+i + ":00");
          if (minuteE > 0) {
            this.timeS.push(+i + "30");
          }
        } else {

          if (minuteS > 0) {
            this.timeS.push(i + ":00");
            this.timeS.push(i + ":30");
          } else {
            this.timeS.push(i + ":00");
            this.timeS.push(i + ":30");
          }

        }//if

        j = j + 1;
      }//for
      this.timeE = this.timeS;
      console.log(this.timeS);
      console.log(this.timeE);

    } else {
      console.log(this.fitness[0].open_fitness + "-" + this.fitness[0].close_fitness);
      var hourS = parseInt(this.fitness[0].open_fitness.split(":")[0]);
      var minuteS = parseInt(this.fitness[0].open_fitness.split(":")[1]);
      var hourE = parseInt(this.fitness[0].close_fitness.split(":")[0]);
      var minuteE = parseInt(this.fitness[0].close_fitness.split(":")[1]);
      console.log(hourS + "  " + minuteS);
      console.log(hourE + "  " + minuteE);
      var j = 0;
      for (var i = hourS; i <= hourE; i++) {
        if (i == hourS) {
          if (minuteS > 0) {
            this.timeS.push(i + ":30");
          } else {
            this.timeS.push(i + ":00");
            this.timeS.push(i + ":30");
          }

        } else if (i == hourE) {
          this.timeS.push(+i + ":00");
          if (minuteE > 0) {
            this.timeS.push(+i + "30");
          }
        } else {

          if (minuteS > 0) {
            this.timeS.push(i + ":00");
            this.timeS.push(i + ":30");
          } else {
            this.timeS.push(i + ":00");
            this.timeS.push(i + ":30");
          }

        }//if

        j = j + 1;
      }//for
      this.timeE = this.timeS;
      console.log(this.timeS);
      console.log(this.timeE);
    }//else

  }

  send(equipment, timeStart, timeEnd) {

    if (equipment == "" || timeStart == "" || timeEnd == "") {

      let alert = this.alertCtrl.create({
        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
        subTitle: 'กรุณาเลือกใส่ข้อมูลให้เรียบร้อย',
      });
      alert.present();

    } else {

      this.date2 = this.date.split(" ")[1].split(",")[0].split("/")[2] + "-";

      if (this.date.split(" ")[1].split(",")[0].split("/")[0] <= 9) {
        this.date2 += "0" + this.date.split(" ")[1].split(",")[0].split("/")[0] + "-";
      } else {
        this.date2 += this.date.split(" ")[1].split(",")[0].split("/")[0] + "-";
      };

      if (this.date.split(" ")[1].split(",")[0].split("/")[1] <= 9) {
        this.date2 += "0" + this.date.split(" ")[1].split(",")[0].split("/")[1];
      } else {
        this.date2 += this.date.split(" ")[1].split(",")[0].split("/")[1];
      }
      // var e = JSON.parse(equipment);
      console.log(equipment.split(";")[0]);
      this.storage.get('member').then((val) => {
        var json = JSON.stringify({ date: this.date2, id: equipment.split(";")[0], type: equipment.split(";")[1], timeS: timeStart, timeE: timeEnd, code: this.codeFitness, member: val, status:'booking'});
        console.log(json);
        var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/saveBookingApplication.php?data=' + json;
        console.log(url);
        this.httpClient.get(url)
          .subscribe(
          (data: any) => {
            console.log(data)
            if (data[0].result == 'SUCCESS') {
              let alert = this.alertCtrl.create({
                title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                subTitle: 'สำเร็จ',
              });
              alert.present();
              this.setData();
            } else if(data[0].result == 'TIME'){
              let alert = this.alertCtrl.create({
                title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
                subTitle: 'กรุณาเลือกเวลาใหม่',
              });
              alert.present();
            } else if(data[0].result == 'ERROR'){
              let alert = this.alertCtrl.create({
                title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                subTitle: 'ไม่สามารถจองได้',
              });
              alert.present();
            }
          }
          );
      });
    }  //else  
  }

  setData() {
    this.navCtrl.push(BookingPage,{code:this.id});
  }

}

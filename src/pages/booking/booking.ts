import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RegisbookPage } from '../regisbook/regisbook';
import { NoticereportPage } from '../noticereport/noticereport';
// import { dateDataSortValue } from 'ionic-angular/util/datetime-util';

// import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  // time:[{id:number,name:string}];
  time: string[] = [];
  fitness: any;
  selectfitness: any;
  date: any;
  date2: any;
  day: any;
  equipment: { name: String, type: String, id: String }[] = [];
  codeFitness: any;
  checkBooking: String = "NO";
  booking: { status: String, type: String, id: String, time: string }[] = [];
  booking2: { status: String, type: String, id: String, time: string }[] = [];
  n: any = 0;
  selectFitnessVal = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private httpClient: HttpClient) {
    
    if(this.navParams.get('code')){
      this.selectFitnessVal = this.navParams.get('code');
      this.viewBooking(this.selectFitnessVal);
    }

    console.log(this.navParams.get('code'));

    var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    this.date = new Date().toLocaleDateString('en-EN', options);
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
    this.day = this.date.split(" ")[0].split(",")[0];
    //Wed, Jan 17, 2018, 8:53 PM
    console.log(this.date2);
    console.log(this.day);

    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllFitness.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
      this.fitness = data;
      console.log(this.fitness)
    }
    );

  }

  ionViewDidLoad() {

  }


  viewBooking(val) {
    this.time = [];
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectEditFitness.php?id=' + val;
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
      this.selectfitness = data;
      this.codeFitness = this.selectfitness[0].code_fitness;
      console.log(this.selectfitness);
      if (this.selectfitness[0].booking_system == 'YES') {
        this.checkBooking = "YES";
        if (this.day == 'Sat' || this.day == 'Sun') {
          console.log(this.selectfitness[0].open_holiday + "-" + this.selectfitness[0].close_holiday);
          var hour = parseInt(this.selectfitness[0].open_holiday.split(":")[0]);
          var hour2 = parseInt(this.selectfitness[0].open_holiday.split(":")[1]);
          console.log(hour + "  " + hour2);
          console.log(this.selectfitness[0].open_holiday + "-" + this.selectfitness[0].close_holiday);
          var hourS = parseInt(this.selectfitness[0].open_holiday.split(":")[0]);
          var minuteS = parseInt(this.selectfitness[0].open_holiday.split(":")[1]);
          var hourE = parseInt(this.selectfitness[0].close_holiday.split(":")[0]);
          var minuteE = parseInt(this.selectfitness[0].close_holiday.split(":")[1]);
          console.log(hourS + "  " + minuteS);
          console.log(hourE + "  " + minuteE);
          var j = 0;
          for (var i = hourS; i <= hourE; i++) {
            if (i == hourS) {
              if (minuteS > 0) {
                this.time.push(i + ":" + minuteS + "-" + (i + 1) + ":00");
              } else {
                this.time.push(i + ":00" + "-" + i + ":30");
                this.time.push(i + ":30" + "-" + (i + 1) + ":00");
              }

            } else if (i == hourE) {
              if (minuteE > 0) {
                this.time.push(+i + ":00" + "-" + i + ":" + minuteE);
              }
            } else {

              if (minuteS > 0) {
                this.time.push(i + ":00" + "-" + i + ":30");
                this.time.push(i + ":" + minuteS + "-" + (i + 1) + ":00");
              } else {
                this.time.push(i + ":00" + "-" + i + ":30");
                this.time.push(i + ":30" + "-" + (i + 1) + ":00");
              }

            }//if

            j = j + 1;
          }//for

          console.log(this.time);

        } else {
          console.log(this.selectfitness[0].open_fitness + "-" + this.selectfitness[0].close_fitness);
          var hourS = parseInt(this.selectfitness[0].open_fitness.split(":")[0]);
          var minuteS = parseInt(this.selectfitness[0].open_fitness.split(":")[1]);
          var hourE = parseInt(this.selectfitness[0].close_fitness.split(":")[0]);
          var minuteE = parseInt(this.selectfitness[0].close_fitness.split(":")[1]);
          console.log(hourS + "  " + minuteS);
          console.log(hourE + "  " + minuteE);
          var j = 0;
          for (var i = hourS; i <= hourE; i++) {
            if (i == hourS) {
              if (minuteS > 0) {
                this.time.push(i + ":" + minuteS + "-" + (i + 1) + ":00");
              } else {
                this.time.push(i + ":00" + "-" + i + ":30");
                this.time.push(i + ":30" + "-" + (i + 1) + ":00");
              }

            } else if (i == hourE) {
              if (minuteE > 0) {
                this.time.push(+i + ":00" + "-" + i + ":" + minuteE);
              }
            } else {

              if (minuteS > 0) {
                this.time.push(i + ":00" + "-" + i + ":30");
                this.time.push(i + ":" + minuteS + "-" + (i + 1) + ":00");
              } else {
                this.time.push(i + ":00" + "-" + i + ":30");
                this.time.push(i + ":30" + "-" + (i + 1) + ":00");
              }

            }//if

            j = j + 1;
          }//for

          console.log(this.time);
        }//else

        //set equipmernt
        this.equipment = [];
        var url2 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectAllEquipment.php?codeFitness="' + this.codeFitness + '"';
        console.log(url2);
        this.httpClient.get(url2).subscribe((data: any) => {
          console.log(data)
          for (var i in data) {
            for (var k = 1; k <= data[i].amount; k++) {
              this.equipment.push({
                name: "" + data[i].name + " " + k,
                type: data[i].type_equipment,
                id: "" + k
              });
            }
          }
          console.log(this.equipment);
          this.setBooking();
        }
        );


      } else if (this.selectfitness[0].booking_system == 'NO') {
        let alert = this.alertCtrl.create({
          title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
          subTitle: 'Fitness ที่ท่านเลือกไม่ได้ทำการลงทะเบียนข้อมูลการจอง',
        });
        alert.present();
        this.checkBooking = "NO";
      }

    }
    );

  }

  setBooking() {
    this.booking = [];
    var json = JSON.stringify({ code: this.codeFitness, date: this.date2 });
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectBookingFitness.php?data=' + json;
    console.log(url);
    this.httpClient.get(url)
      .subscribe(
      (data: any) => {
        console.log(data);
        for (var i in data) {
          var hourS = parseInt(data[i].time_start.split(":")[0]);
          var minuteS = parseInt(data[i].time_start.split(":")[1]);
          var hourE = parseInt(data[i].time_end.split(":")[0]);
          var minuteE = parseInt(data[i].time_end.split(":")[1]);
          console.log(hourS + "  " + minuteS);
          console.log(hourE + "  " + minuteE);
          var j = 0;
          for (var l = hourS; l <= hourE; l++) {
            if (l == hourS) {
              if (minuteS > 0) {

                this.booking.push({
                  status: data[i].status,
                  type: data[i].type_equipment,
                  id: data[i].id_equipment,
                  time: l + ":" + minuteS + "-" + (l + 1) + ":00"
                });

              } else {

                this.booking.push({
                  status: data[i].status,
                  type: data[i].type_equipment,
                  id: data[i].id_equipment,
                  time: l + ":00" + "-" + l + ":30"
                });

                if (hourE - hourS >= 1) {
                  this.booking.push({
                    status: data[i].status,
                    type: data[i].type_equipment,
                    id: data[i].id_equipment,
                    time: l + ":30" + "-" + (l + 1) + ":00"
                  });
                }

              }

            } else if (l == hourE) {
              if (hourE - hourS > 1) {
                if (minuteE > 0) {

                  this.booking.push({
                    status: data[i].status,
                    type: data[i].type_equipment,
                    id: data[i].id_equipment,
                    time: l + ":00" + "-" + l + ":" + minuteE
                  });

                }
              }
            } else {

              if (minuteS > 0) {

                this.booking.push({
                  status: data[i].status,
                  type: data[i].type_equipment,
                  id: data[i].id_equipment,
                  time: l + ":00" + "-" + l + ":30"
                });
                this.booking.push({
                  status: data[i].status,
                  type: data[i].type_equipment,
                  id: data[i].id_equipment,
                  time: l + ":" + minuteS + "-" + (l + 1) + ":00"
                });

              } else {

                this.booking.push({
                  status: data[i].status,
                  type: data[i].type_equipment,
                  id: data[i].id_equipment,
                  time: l + ":00" + "-" + l + ":30"
                });
                this.booking.push({
                  status: data[i].status,
                  type: data[i].type_equipment,
                  id: data[i].id_equipment,
                  time: l + l + ":30" + "-" + (l + 1) + ":00"
                });

              }

            }//if

            j = j + 1;
          }//for

        }

        console.log(this.booking)
      }
      );
  }

  goToBook(val){
    this.navCtrl.push(RegisbookPage,{id:val});
  }

  goToReport(val){
    this.navCtrl.push(NoticereportPage,{id:val});
  }
  
  
}

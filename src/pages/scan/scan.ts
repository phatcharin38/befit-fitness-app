import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { AlertController } from 'ionic-angular';
import { FitnessPage } from '../fitness/fitness';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  option: BarcodeScannerOptions;
  data = {};
  resultprocess = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner,
    private httpClient: HttpClient, private storage: Storage, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }

  scan() {
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.data = barcodeData;
      console.log(barcodeData.text);
      var n = barcodeData.text.indexOf(";");
      if(n == -1){
        let alert = this.alertCtrl.create({
          title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
          subTitle: 'ไม่สามารถทำรายการได้',
        });
        alert.present();  
      }else{
    this.scan2(barcodeData.text);
    // this.scan2("1;AAA;1");
      }
    }, (err) => {
      // An error occurred
      console.log(err)
    });
  }

  scan2(data) {
    var date = null;
    var date2 = null;
    var time = null;
    var options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', };
    date = new Date().toLocaleDateString('en-EN', options);
    date2 = date.split(" ")[1].split(",")[0].split("/")[2] + "-";

    if (date.split(" ")[1].split(",")[0].split("/")[0] <= 9) {
      date2 += "0" + date.split(" ")[1].split(",")[0].split("/")[0] + "-";
    } else {
      date2 += date.split(" ")[1].split(",")[0].split("/")[0] + "-";
    };

    if (date.split(" ")[1].split(",")[0].split("/")[1] <= 9) {
      date2 += "0" + date.split(" ")[1].split(",")[0].split("/")[1];
    } else {
      date2 += date.split(" ")[1].split(",")[0].split("/")[1];
    }

    time = (new Date().toLocaleDateString('th-TH', options)).split(" ")[2];

    var id = data.split(";")[2]
    var type = data.split(";")[1]
    var c = data.split(";")[0]
    var code = "";

    var url3 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectCodeFitness.php?id=' + c;
    console.log(url3);
    this.httpClient.get(url3)
      .subscribe((response4: any) => {
        console.log(response4);
        code = response4[0].code_fitness;
        this.storage.get('member').then((val) => {
          var url3 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectDocumentFitness.php?id=' + code;
          console.log(url3);
          this.httpClient.get(url3)
            .subscribe((response3: any) => {
              console.log(response3);
              if (response3[0].booking_system == "YES") {
                //*************************************************************************************************************** */
                var json = JSON.stringify({
                  id: id,
                  type: type,
                  date: date2,
                  code: code,
                  time: time
                });
                var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/checkBookingApplication.php?data=' + json;
                console.log(url);
                this.httpClient.get(url)
                  .subscribe((response: any) => {
                    console.log(response)
                    if (response.result == 'SUCCESS') {
                      if (response.data[0].id_mem == val) {
                        //status booking
                        if (response.data[0].status == 'booking') {
                          //update status
                          var json2 = JSON.stringify({
                            id: response.data[0].id,
                          });
                          var url2 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/updateStatusBooking.php?data=' + json2;
                          console.log(url2);
                          this.httpClient.get(url2)
                            .subscribe((response2: any) => {
                              if (response2 == 'SUCCESS') {
                                let alert = this.alertCtrl.create({
                                  title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                                  subTitle: 'คุณได้ทำการสำเร็จ สามารถใช้เครื่องเล่นได้',
                                });
                                alert.present();
                              } else {
                                let alert = this.alertCtrl.create({
                                  title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                                  subTitle: 'ไม่สามารถทำรายการได้',
                                });
                                alert.present();
                              }
                            });
                          //end update status

                        } else if (response.data[0].status == 'running') {
                          //status running
                          let alert = this.alertCtrl.create({
                            title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                            subTitle: 'ไม่สามารถทำรายการได้ เครื่องออกกำลังกายอยู่ในสถานะมีการใช้งาน',
                          });
                          alert.present();
                        }
                      } else {
                        let alert = this.alertCtrl.create({
                          title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                          subTitle: 'ไม่สามารถทำรายการได้ เครื่องออกกำลังกายอยู่ในสถานะจอง',
                        });
                        alert.present();
                      }
                    } else if (response.result == 'EMPTY') {
                      let alert = this.alertCtrl.create({
                        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
                        message: 'ตอนนี้เครื่องว่าง คุณต้องการทำการจองหรือไม่',
                        buttons: [
                          {
                            text: 'ไม่ต้องการ',
                            role: 'cancel',
                            handler: () => {
                              console.log('Cancel clicked');
                            }
                          },
                          {
                            text: 'ต้องการ',
                            handler: () => {
                              this.navCtrl.push(FitnessPage, { id: c });
                            }
                          }
                        ]
                      });
                      alert.present();
                    } else if (response.result == 'ERROR') {
                      let alert = this.alertCtrl.create({
                        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                        subTitle: 'ไม่สามารถทำรายการได้',
                      });
                      alert.present();
                    }
                  }
                  );
                //*************************************************************************************************************** */  
              } else if (response3[0].booking_system == "NO") {
                var json4 = JSON.stringify({
                  date: date2,
                  code: code,
                  id: id,
                  type: type,
                  member: val
                });
                var url4 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/addDataBooking.php?data=' + json4;
                console.log(url4);
                this.httpClient.get(url4)
                  .subscribe((response4: any) => {
                    if (response4 == 'SUCCESS') {
                      let alert = this.alertCtrl.create({
                        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                        subTitle: 'คุณได้ทำการสำเร็จ จัดเก็บข้อมูลการใช้งาน',
                      });
                      alert.present();
                    } else {
                      let alert = this.alertCtrl.create({
                        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signFalse.png" width="70px" height="70px">',
                        subTitle: 'ไม่สามารถทำรายการได้',
                      });
                      alert.present();
                    }

                  });
              }
            });
          //end check booking fitness

        });//end check session
      });

  }


}

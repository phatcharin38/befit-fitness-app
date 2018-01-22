import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { BookingPage } from '../booking/booking';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the NoticereportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-noticereport',
  templateUrl: 'noticereport.html',
})
export class NoticereportPage {
  id: any;
  equipment: { name: String, value: string }[] = [];
  fitness: any;
  codeFitness: any;
  selectEquipmentVal = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
    private storage: Storage, public alertCtrl: AlertController) {
    this.id = this.navParams.get('id');
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectEditFitness.php?id="' + this.id + '"';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
      console.log(data)
      this.fitness = data;
      this.codeFitness = data[0].code_fitness;
      this.setEquipment();

    }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticereportPage');
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

  send(equipment) {
    var count = 0;
    for (var data in this.equipment) {
      if (equipment == this.equipment[data].value) {
        count = count + 1;
      }
      console.log(this.equipment[data].value);
    }
    //console.log(equipment);
    if (count != 0) {
      this.storage.get('member').then((val) => {
        var json = JSON.stringify({ id: equipment.split(";")[0], type: equipment.split(";")[1], code: this.codeFitness, member: val });
        console.log(json);
        var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/saveReportNoticeApplication.php?data=' + json;
        console.log(url);
        this.httpClient.get(url)
          .subscribe(
          (data: any) => {
            console.log(data)
            if (data == 'SUCCESS') {
              let alert = this.alertCtrl.create({
                title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                subTitle: 'สำเร็จ',
              });
              alert.present();

              this.setData();
            } else {
              console.log(data);
            }
          }
          );
      });
    } else {
      let alert = this.alertCtrl.create({
        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
        subTitle: 'กรุณาเลือกใส่ข้อมูลให้เรียบร้อย',
      });
      alert.present();
    }
  }

  setData() {
    this.selectEquipmentVal = "";
    // this.navCtrl.push(BookingPage);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the NoticePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notice',
  templateUrl: 'notice.html',
})
export class NoticePage {

  text: string = "";
  fitness: any;
  selectFitnessVal = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    private httpClient: HttpClient) {
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllFitness.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
      this.fitness = data;
      console.log(this.fitness)
    }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }



  send(id, text) {
    if (id == "" || text == "") {
      let alert = this.alertCtrl.create({
        title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
        subTitle: 'กรุณาเลือกใส่ข้อมูลให้เรียบร้อย',
      });
      alert.present();  
    }else{
      var json = JSON.stringify({ id: id, text: text });
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/sendNoticeApplication.php?data=' + json;
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
        });
    }

  }

  setData() {
    // var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllFitness.php';
    // console.log(url);
    // this.httpClient.get(url).subscribe((data: any) => {
    //   this.fitness = data;
    //   console.log(this.fitness)
    // }
    // );
    this.text = "";
    this.selectFitnessVal = "";
  }


}

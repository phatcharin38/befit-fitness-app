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
  emo : any = 0;
  emoSys : any = 0;
  text: string = "";
  fitness: any;
  selectFitnessVal = ""; 
  selectfitness : String = "";
  rating : string = 'fitness';
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

  changeEmo(val){
    this.emo = val;
    // console.log(this.emo);
  }

  changeEmoSystem(val){
    this.emoSys = val;
    // console.log(this.emo);
  }

  sendproblem(id, text) {
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
    this.text = "";
    this.selectFitnessVal = "";
  }

  send(val){
    console.log(this.selectfitness);
      if(val == 'F'){       
        if(this.selectfitness == "" || this.emo == 0){
          
            let alert = this.alertCtrl.create({
              title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
              subTitle: 'กรุณาเลือกใส่ข้อมูลให้เรียบร้อย',
            });
            alert.present();
          
        }else{
          //http       
          var json = json = JSON.stringify({code:this.selectfitness,point:this.emo,type:val});
          var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/sendRatingApplication.php?data=' + json;
          console.log(url);
          this.httpClient.get(url).subscribe((data: any) => {
              console.log(data)
              if(data.result == 'SUCCESS'){

                let alert = this.alertCtrl.create({
                  title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                  subTitle: 'สำเร็จ',
                });
                alert.present();

                this.changeEmo(0);
                this.selectfitness = "";
              } 
            }
          );
          //http
        }
      }else{
        if(this.emoSys == 0){
          let alert = this.alertCtrl.create({
            title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
            subTitle: 'กรุณาเลือกใส่ข้อมูลให้เรียบร้อย',
          });
          alert.present();     
        }else{
          //http 
          var json2 = JSON.stringify({code:'system',point:this.emoSys,type:val});
          var url2 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/sendRatingApplication.php?data=' + json2;
          console.log(url2);
          this.httpClient.get(url2).subscribe((data: any) => {
              console.log(data)
              if(data.result == 'SUCCESS'){
                let alert = this.alertCtrl.create({
                  title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signTrue.png" width="70px" height="70px">',
                  subTitle: 'สำเร็จ',
                });
                alert.present();
                this.changeEmoSystem(0);
              }
            }
          );
          //http
      }
    }
  } //SEND


}

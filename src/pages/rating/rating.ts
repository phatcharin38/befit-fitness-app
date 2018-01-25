import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the RatingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rating',
  templateUrl: 'rating.html',
})
export class RatingPage {
  emo : any = 0;
  emoSys : any = 0;
  rating : string = 'fitness';
  fitness : any;
  selectfitness : String = "";
  text: string = "";
  selectFitnessVal = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient,
    private alertCtrl: AlertController) {
    this.setAllFitness();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RatingPage');
  }

  changeEmo(val){
    this.emo = val;
    // console.log(this.emo);
  }

  changeEmoSystem(val){
    this.emoSys = val;
    // console.log(this.emo);
  }

  setAllFitness(){
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllFitness.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        console.log(data)
        this.fitness = data;
      }
    );
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
  
      
}

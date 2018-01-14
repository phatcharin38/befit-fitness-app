import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
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
          alert("Please Select Fitness Or Select Point");
        }else{
          //http       
          var json = json = JSON.stringify({code:this.selectfitness,point:this.emo,type:val});
          var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/sendRatingApplication.php?data=' + json;
          console.log(url);
          this.httpClient.get(url).subscribe((data: any) => {
              console.log(data)
              if(data.result == 'SUCCESS'){
                this.changeEmo(0);
                this.selectfitness = "";
              }
            }
          );
          //http
        }
      }else{
        if(this.emoSys == 0){
          alert("Select Point");             
        }else{
          //http 
          var json2 = JSON.stringify({code:'system',point:this.emoSys,type:val});
          var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/sendRatingApplication.php?data=' + json2;
          console.log(url);
          this.httpClient.get(url).subscribe((data: any) => {
              console.log(data)
              if(data.result == 'SUCCESS'){
                this.changeEmoSystem(0);
              }
            }
          );
          //http
      }
    }
  } //SEND
      
}

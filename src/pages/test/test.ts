import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the TestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-test',
  templateUrl: 'test.html',
})
export class TestPage {
  name : String = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private httpClient:HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
  }

  onNameKeyUp(event:any){
    this.name = event.target.value;
    // console.log(event.target.value);
  }

  getProfile(){
    // console.log(this.name);
    this.httpClient.get('http://localhost/myprofile/json/profile.json')
    .subscribe(
      (data:any[]) => {
        console.log(data)
      }
    )
  }

}

import { Component , ViewChild, ElementRef } from '@angular/core';
import { App } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import JsBarcode from 'jsbarcode';
import { LoadingPage } from '../loading/loading';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

export class ProfilePage {

  pushHomePage: any;
  json:any;
  name:String = "";
  age:String = "";
  tel:String = "";
  address:String = "";
  income:String = "";
  weight:String = "";
  height:String = "";
  disease:String = "";
  email:String = "";
  birthday:String = "";
  @ViewChild('barcode') barcode: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private httpClient:HttpClient,private storage: Storage,public appCtrl: App) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    
    this.storage.get('member').then((val) => {

      this.json = JSON.stringify({ member: val});
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectProfileApplication.php?data=' + this.json;
      console.log(url);
      this.httpClient.get(url)
        .subscribe(
        (data: any) => {
          console.log(data)
          this.name = data[0].firtname + " " + data[0].lastname;
          this.birthday = data[0].birthday;
          this.age = data[0].age;
          this.tel= data[0].tel;
          this.address = data[0].address;
          this.income = data[0].income;
          this.weight = data[0].weight;
          this.height = data[0].height;
          this.disease = data[0].disease;
          this.email = data[0].email;
        }
        );
    });
  }

  ngAfterViewInit() {
    this.storage.get('member').then((val) => {
      JsBarcode(this.barcode.nativeElement, val);
    });
  }
 
  logout(){
    this.appCtrl.getRootNav().setRoot(LoadingPage);
  }

}


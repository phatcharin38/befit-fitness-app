import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  pushHomePage: any;
  pushProfilePage: any;
  myDate: any;
  date: any;
  dataItem:any = [];
  month: any = [];
  d: any = "";
  m: any = "";
  y: any = "";
  m2: any = "";
  i: any = 0;
  n: any = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
    this.pushProfilePage = ProfilePage;
    this.date = new Date().toISOString();
    this.dataItem = [
                    {
                      date:'19 December 2017',
                      data : [{ id : 1,equipment : 'Treadmill-01',time:'10.30 - 11.00',status:'close'},
                              { id : 2,equipment : 'Eilliptical-05',time:'12.30 - 12.45',status:'close'},
                              { id : 3,equipment : 'Rowing Machine-02',time:'17.30 - 17.45',status:'close'}]
                    },
                    {
                      date:'20 December 2017',
                      data : [{ id : 1,equipment : 'Treadmill-01',time:'10.30 - 11.00',status:'close'},
                              { id : 2,equipment : 'Eilliptical-05',time:'12.30 - 12.45',status:'close'},
                              { id : 3,equipment : 'Rowing Machine-02',time:'17.30 - 17.45',status:'close'}]
                    },
                    {
                      date:'21 December 2017',
                      data : [{ id : 1,equipment : 'Treadmill-02',time:'10.30 - 11.00',status:'open'},
                              { id : 2,equipment : 'Eilliptical-06',time:'12.30 - 12.45',status:'open'},
                              { id : 3,equipment : 'Rowing Machine-08',time:'17.30 - 17.45',status:'open'}]
                    }
                ];
    this.month =  [[{id:1},{name:'January'}],[{id:2},{name:'February'}],
                  [{id:3},{name:'March'}],[{id:4},{name:'April'}],
                  [{id:5},{name:'May'}],[{id:6},{name:'June'}],
                  [{id:7},{name:'July'}],[{id:8},{name:'August'}],
                  [{id:9},{name:'September'}],[{id:10},{name:'October'}],
                  [{id:11},{name:'November'}],[{id:12},{name:'December'}]];
  }

  ionViewDidLoad() {   
    console.log('ionViewDidLoad HistoryPage');
    this.changDate(this.date);
    
  }

  goToHome() {
    this.navCtrl.push(this.pushHomePage);
  }

  goToProfile() {
    this.navCtrl.push(this.pushProfilePage);
  }

  goToDelete(id) {
    let confirm = this.alertCtrl.create({
      title: 'Comfirm Delete?',
      message: 'You want to cancel this booked',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        }
      ]
    });
    confirm.present();
    
  }

  changDate(date){
    //2017-12-21T18:56:02.814Z
    this.n = date.indexOf("T");
    this.y = date.substring(0,this.n).split('-')[0];
    this.m = date.substring(0,this.n).split('-')[1];
    this.d = date.substring(0,this.n).split('-')[2];
    // console.log(this.d);
    for(this.i=0;this.i<12;this.i++){
      if(this.m == this.month[this.i][0].id){
        this.m2 = this.month[this.i][1].name;
      }
    }
    this.myDate = "" + this.d + " " + this.m2 + " " +  this.y;
    console.log(this.myDate);
  }

}

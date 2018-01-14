import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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

  problem: string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoticePage');
  }

  onchangeEquipment(selectEquipment) { 
    // console.log('lllllllllllllllllllllllllllllll');
    console.log(selectEquipment);
    
    // this.selectIdEquipment = [];

    // if(selectEquipment == 'e01'){
    //   this.selectIdEquipment.push({id : "spin01",name : "Spin Bike-01"});
    //   this.selectIdEquipment.push({id : "spin02",name : "Spin Bike-02"});
    // }else if(selectEquipment == 'e02'){
    //   this.selectIdEquipment.push({id : "upright01",name : "Upright Bike-01"});
    //   this.selectIdEquipment.push({id : "upright02",name : "Upright Bike-02"});
    // }else if(selectEquipment == 'e03'){
    //   this.selectIdEquipment.push({id : "eilli01",name : "Eillitical-01"});
    //   this.selectIdEquipment.push({id : "eilli02",name : "Eillitical-02"});
    // }else if(selectEquipment == 'e04'){
    //   this.selectIdEquipment.push({id : "treadmill01",name : "Treadmill-01"});
    //   this.selectIdEquipment.push({id : "treadmill02",name : "Treadmill-02"});
    // }else if(selectEquipment == 'e05'){
    //   this.selectIdEquipment.push({id : "rowing01",name : "Rowing-01"});
    //   this.selectIdEquipment.push({id : "rowing02",name : "Rowing-02"});
    // }

    // console.log(this.selectIdEquipment);

  }

  // onchangeIdEquipment(id) { 
  //       console.log(id);

  // }

  send(problem) {
    let confirm = this.alertCtrl.create({
      title: 'Comfirm Send?',
      message: 'Problem : ' + problem,
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.problem = "";
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
  
}

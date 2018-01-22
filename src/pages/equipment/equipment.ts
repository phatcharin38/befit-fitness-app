import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FitnessPage } from '../fitness/fitness';
// import { FitnessPage } from '../fitness/fitness';
/**
 * Generated class for the EquipmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-equipment',
  templateUrl: 'equipment.html',
})
export class EquipmentPage {

  item: any = [];
  equipment:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    this.initializeItems();
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad EquipmentPage');
  }

  initializeItems() {
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllEquipmentApplication.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        console.log(data)
        this.equipment = data;
      }
    );
  }

  getItems(ev: any) {
    // set val to the value of the searchbar
    let val = ev.target.value;

    // Reset items back to all of the items
    if(val == ''){
      this.initializeItems();
    }else{
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.equipment = this.equipment.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  }

  goToFitness(val){
    this.navCtrl.push(FitnessPage,{id:val});
  }
  
  
}

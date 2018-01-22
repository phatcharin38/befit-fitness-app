import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { BookingPage } from '../booking/booking';
/**
 * Generated class for the FitnessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-fitness',
  templateUrl: 'fitness.html',
})
export class FitnessPage {

  id : any;
  fitness:any;
  equipment:any;
  codeFitness:any;
  booking:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    this.id = this.navParams.get('id');

    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectEditFitness.php?id="' + this.id+'"';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        console.log(data)
        this.fitness = data;
        this.codeFitness = data[0].code_fitness;
        this.booking = data[0].booking_system
        console.log(this.booking);
        this.setEquipment();
      }
    );  
  }

  ionViewDidLoad() {
    // console.log(this.codeFitness);
    
  }

  setEquipment(){
    var url2 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectAllEquipment.php?codeFitness="' + this.codeFitness+'"';
    console.log(url2);
    this.httpClient.get(url2).subscribe((data: any) => {
        console.log(data)
        this.equipment = data;
      }
    );
  }

  viewBooking(){
    console.log("viewBooking");
  }

  goToBook(){
    this.navCtrl.push(BookingPage,{code:this.id});
  }

}

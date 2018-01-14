import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
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

  codeFitness : any;
  fitness:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    this.codeFitness = this.navParams.get('id');
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectEditFitness.php?id="' + this.codeFitness+'"';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        console.log(data)
        this.fitness = data;
      }
    );
  }

  ionViewDidLoad() {
    // console.log(this.codeFitness);
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FitnessPage } from '../fitness/fitness';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  item: any = [];
  searchQuery: string = '';
  fitness : any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    // this.setAllFitness();
  }

  initializeItems() {
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllFitness.php';
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        console.log(data)
        this.fitness = data;
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
        this.fitness = this.fitness.filter((item) => {
        return (item.name_fitness.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }
  }

  goToFitness(val){
    this.navCtrl.push(FitnessPage,{id:val});
  }



}

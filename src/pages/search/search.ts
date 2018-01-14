import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  items: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  initializeItems() {
    this.items = [ 
      [{id:1},{name:'Fitness First'},{address:'The mall korat'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/fitnessfirst.jpg'}],
      [{id:2},{name:'KSB Gym'},{address:'Maeng'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/ksb2.jpg'}],
      [{id:3},{name:'Maungthai Fitness'},{address:'Save One'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/maungthai.jpg'}],
      [{id:4},{name:'Maungthai Fitness'},{address:'Save One'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/maungthai.jpg'}]
    ];
    // this.items = [
    //   'Amsterdam',
    //   'Bogota',
    //   'Nook'
    // ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        // console.log(item);
        return (item[1].name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }


}

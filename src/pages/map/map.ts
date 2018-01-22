import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpClient } from '@angular/common/http';
import { FitnessPage } from '../fitness/fitness';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google: any;
// declare var map: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  @ViewChild('map') mapRef: ElementRef;
  pushPage:any;
  map: any;
  lat: any;
  long: any;
  string: any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private geolocation: Geolocation, private httpClient: HttpClient, public alertCtrl: AlertController) {
      this.pushPage = FitnessPage;
  }

  ionViewDidLoad() {
    console.log(this.mapRef);
    this.showMap();
  }

  showMap() {
    this.currentLocation();
    // this.otherLocation();
  }

  currentLocation() {
    //location-lat long current
    this.geolocation.getCurrentPosition().then((resp) => {
      const location = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      //mao option 
      const options = {
        center: location,
        zoom: 10
      }
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      var image1 = "http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/icon-my.png";
      this.addMarker(location, this.map,'You',image1);

      //get all fitness
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllFitness.php';
      console.log(url);
      this.httpClient.get(url).subscribe((data: any) => {
          console.log(data)
          for (var key in data) {
            console.log(data[key].latitude + "   " + data[key].longitude);
            //add fitness
            const location = new google.maps.LatLng(data[key].latitude, data[key].longitude);
            var image2 = "http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/icon-map.png";
            this.addMarker(location, this.map,data[key].id,image2);
            
          }
        }
      );

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  addMarker(position, map,text,image) { 
    if(text == 'You'){

      var marker = new google.maps.Marker({
        position : position,
        title: text,
        map: map,
        icon: image
      });
      google.maps.event.addListener(marker, 'click', () => {
        let alert = this.alertCtrl.create({
          title: '<img src="http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/signWarning.png" width="70px" height="70px">',
          subTitle: 'คุณอยู่ที่นี่',
        });
        alert.present();  
      });
      
    }else{
    var marker = new google.maps.Marker({
      position : position,
      title: text,
      map: map,
      icon: image
    });
    google.maps.event.addListener(marker, 'click', () => {
      //infoWindow.open(this.map, marker);
      this.navCtrl.push(FitnessPage,{id:text});
    });
  }
}

}

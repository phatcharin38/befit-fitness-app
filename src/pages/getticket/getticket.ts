import { Component , ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import JsBarcode from 'jsbarcode';
/**
 * Generated class for the GetticketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getticket',
  templateUrl: 'getticket.html',
})
export class GetticketPage {
  id:any;
  promotion:any;
  @ViewChild('barcode') barcode: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpClient: HttpClient) {
    this.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetticketPage');
    this.setPromotion();
    // console.log(this.id);
  }

  setPromotion(){
    var json = JSON.stringify({id:this.id});
    var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/setAllPromotion.php?data=' + json;
    console.log(url);
    this.httpClient.get(url).subscribe((data: any) => {
        this.promotion = data;
        console.log(this.promotion);
        JsBarcode(this.barcode.nativeElement, this.id);
      }
    );
  }

  

}

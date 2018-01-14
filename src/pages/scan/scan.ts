import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner,BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import JsBarcode from 'jsbarcode';
/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  option : BarcodeScannerOptions;
  data={ };
  qrData = "Hello World";
  createCode = null;
  encodeData : string ;
  encodedData : {} ;
  @ViewChild('barcode') barcode: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,private barcodeScanner: BarcodeScanner) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
    this.createCode = this.qrData;
    // JsBarcode(this.barcode.nativeElement, window.localStorage.getItem("auth_key"));
  }

  async scan(){
    // this.option = {
    //   // preferFrontCamera : true,
    //   prompt : "Please Scan Your Barode or QR Code"
    // };
    this.barcodeScanner.scan().then((barcodeData) => {
      // Success! Barcode data is here
      this.data = barcodeData;
      //  alert(barcodeData)
     }, (err) => {
         // An error occurred
       console.log(err)
     });
  }

  async encode(){
    const result = await this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,"snooker");
  }

  encodeText(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE,this.encodeData).then((encodedData) => {

        console.log(encodedData);
        this.encodedData = encodedData;

    }, (err) => {
        console.log("Error occured : " + err);
    });                 
  }

  ngAfterViewInit() {
    JsBarcode(this.barcode.nativeElement, '12345');
  }

}

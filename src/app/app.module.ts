import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BarcodeScanner,BarcodeScannerOptions} from '@ionic-native/barcode-scanner';
import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
//add link page
import { SearchPage } from '../pages/search/search';
import { TabsPage } from '../pages/tabs/tabs';
// import { EquipmentPage } from '../pages/equipment/equipment';
import { ProfilePage } from '../pages/profile/profile';
// import { HistoryPage } from '../pages/history/history';
// import { NoticePage } from '../pages/notice/notice';
// import { BookingPage } from '../pages/booking/booking';
import { ScanPage } from '../pages/scan/scan';
import { PincodePage } from '../pages/pincode/pincode';
import { SetpincodePage } from '../pages/setpincode/setpincode';
import { IndexPage } from '../pages/index/index';
import { LoadingPage } from '../pages/loading/loading';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';
import { GetticketPage } from '../pages/getticket/getticket';
import { PromotionPage } from '../pages/promotion/promotion';
import { MapPage } from '../pages/map/map';
import { ReportPage } from '../pages/report/report';
import { FitnessPage } from '../pages/fitness/fitness';
import { RatingPage } from '../pages/rating/rating';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  //add page
  declarations: [
    MyApp,
    SearchPage,
    TabsPage,
    // EquipmentPage,
    ProfilePage,
    // HistoryPage,
    // NoticePage,
    // BookingPage,
    ScanPage,
    PincodePage,
    IndexPage,
    LoadingPage,
    RegisterPage,
    SetpincodePage,
    HomePage,
    GetticketPage,
    PromotionPage,
    MapPage,
    ReportPage,
    FitnessPage,
    RatingPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  //add entry
  entryComponents: [
    MyApp,
    SearchPage,
    TabsPage,
    // EquipmentPage,
    ProfilePage,
    // HistoryPage,
    // NoticePage,
    // BookingPage,
    ScanPage,
    PincodePage,
    IndexPage,
    LoadingPage,
    RegisterPage,
    SetpincodePage,
    HomePage,
    GetticketPage,
    PromotionPage,
    MapPage,
    ReportPage,
    FitnessPage,
    RatingPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

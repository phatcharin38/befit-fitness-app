import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

// import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  image: any;
  nameEquipment: any;
  selectOptions: any;
  time: any = [];
  selected: string;
  myDate: String;
  equipment: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.time = [
      [{ id: 1 }, { time: '10.00' }], [{ id: 2 }, { time: '10.30' }], [{ id: 3 }, { time: '11.00' }], [{ id: 4 }, { time: '11.30' }],
      [{ id: 5 }, { time: '12.00' }], [{ id: 6 }, { time: '12.30' }], [{ id: 7 }, { time: '13.00' }], [{ id: 8 }, { time: '13.30' }],
      [{ id: 9 }, { time: '14.00' }], [{ id: 10 }, { time: '14.30' }], [{ id: 11 }, { time: '15.00' }], [{ id: 12 }, { time: '15.30' }],
      [{ id: 13 }, { time: '16.00' }], [{ id: 14 }, { time: '16.30' }], [{ id: 15 }, { time: '17.00' }], [{ id: 16 }, { time: '17.30' }],
      [{ id: 17 }, { time: '18.00' }], [{ id: 18 }, { time: '18.30' }], [{ id: 19 }, { time: '19.00' }], [{ id: 20 }, { time: '19.30' }]
    ];

    this.equipment = [
      [{idType:1},{nameType:'Spin Bike'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/type1.png'},{data:[
          [{id:'01'},{name:'Spin Bike-01'},{status:'empty'}],
          [{id:'02'},{name:'Spin Bike-02'},{status:'booking'}]
          ]
        }
      ],
      [{idType:2},{nameType:'Upright Bike'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/type2.png'},{data:[
          [{id:'01'},{name:'Upright Bike-01'},{status:'empty'}],
          [{id:'02'},{name:'Upright Bike-02'},{status:'booking'}]
          ]
        }
      ],
      [{idType:3},{nameType:'Eilliptical'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/type3.png'},{data:[
          [{id:'01'},{name:'Eilliptical-01'},{status:'empty'}],
          [{id:'02'},{name:'Eilliptical-02'},{status:'booking'}]
          ]
        }
      ],
      [{idType:4},{nameType:'Treadmaill'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/type4.png'},{data:[
          [{id:'01'},{name:'Treadmaill-01'},{status:'empty'}],
          [{id:'02'},{name:'Treadmaill-02'},{status:'booking'}]
          ]
        }
      ],
      [{idType:5},{nameType:'Rowing Machine'},{img:'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/image-mobile/type5.png'},{data:[
          [{id:'01'},{name:'Rowing Machine-01'},{status:'empty'}],
          [{id:'02'},{name:'Rowing Machine-02'},{status:'booking'}]
          ]
        }
      ]
    ];

  }

  ionViewDidLoad() {
    console.log(this.equipment);
  }


  goToBook(id) {
    let confirm = this.alertCtrl.create({
      title: 'Comfirm Booking?',
      message: 'Equipment : ' + id + '<br>Time : 15.00.15.30',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
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

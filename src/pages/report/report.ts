import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {


  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [0];
  public doughnutChartType: string = 'doughnut';

  //line
  public lineChartData: { data: Number[], label: String }[] = [
    { data: [], label: 'จำนวนวัน' }
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = { responsive: true };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  //bar
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = [];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: { data: Number[], label: String }[] = [{ data: [], label: 'ร้อยละ' }];

  label: string[] = [];
  data: number[] = [];
  mounth: number[];
  fitness: string[] = [];
  count: number[] = [];
  date = (new Date()).getFullYear();

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    private httpClient: HttpClient) {     
      console.log(this.date);
      this.refresh();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
    this.refresh()
  }

  refresh() {
    this.setDataReportDoughnut();
    this.setDataReportBar();
    this.setDataReportLine();
  }

  setDataReportDoughnut(){
    this.storage.get('member').then((val) => {
      var json = JSON.stringify({ member: val });   
      //***************************************************************** */      
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectChartFitness.php?data=' + json;
      console.log(url);
      
      this.httpClient.get(url)
        .subscribe(
        (result: any) => {
          console.log(result)
          var sum = 0;
          for(var i in result){
            sum = sum + result[i].count;
          }
          this.doughnutChartLabels = [];
          // this.count = [];
          for(var i in result){
            this.doughnutChartLabels[i] = result[i].name;
            this.doughnutChartData[i] = Number(result[i].count);
          }         
          // this.doughnutChartData = this.count;
          // this.doughnutChartLabels =  ["AAA","AAA","AAA"];
          console.log(this.doughnutChartLabels);
          console.log(this.doughnutChartData);
        });
    });
  
  }

  setDataReportBar() {
    this.storage.get('member').then((val) => {
      var json = JSON.stringify({ member: val });   
      //***************************************************************** */      
      var url = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectChartTypeEquipment.php?data=' + json;
      console.log(url);
      this.httpClient.get(url)
        .subscribe(
        (data: any) => {
          console.log(data)
          var sum = 0;
          for (var d in data) {
            sum += parseInt(data[d].count);
          }
          console.log(sum);
          this.label = [];
          this.data = [];
          for (var d in data) {
            this.label.push(data[d].name);
            this.data.push((data[d].count * 100) / sum);
          }
          this.barChartLabels = this.label;
          this.barChartData[0].data = this.data;
        }
        );

    });
  }

  setDataReportLine() {
    console.log(this.date);
    this.storage.get('member').then((val) => {
      var json = JSON.stringify({ member: val , year : this.date});
      //***************************************************************** */
      var url2 = 'http://it2.sut.ac.th/prj60_g43/g43/befit-fitness/service/selectChartMonth.php?data=' + json;
      this.httpClient.get(url2)
        .subscribe(
        (response: any) => {
          this.mounth = [];
          console.log(response)
          for (var j in response) {
            this.mounth.push(response[j].count);
          }
          this.lineChartLabels = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
          this.lineChartData[0].data = this.mounth;
          console.log(this.lineChartData);
        });
    });
}



  // events 
  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartHovered2(e: any): void {
    console.log(e);
  }

  public chartHovered3(e: any): void {
    console.log(e);
  }



}

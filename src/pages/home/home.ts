import { Component, ViewChild } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Chart } from 'chart.js';
import 'chart.piecelabel.js';
import { Institute } from '../../providers/api/institute';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('doughnutCanvas') doughnutCanvas;

  doughnutChart: any;
  //state data
  states = [
    {'name':'selangor', 'value':'selangor', 'icon':'assets/imgs/selangor.png'},
    {'name':'kuala lumpur', 'value':'W.P Kuala Lumpur', 'icon':'assets/imgs/kl.png'},
    {'name':'sarawak', 'value':'sarawak', 'icon':'assets/imgs/sarawak.png'},
    {'name':'johor', 'value':'johor', 'icon':'assets/imgs/johor.png'},
    {'name':'pulau pinang', 'value':'penang', 'icon':'assets/imgs/penang.png'},
    {'name':'sabah', 'value':'sabah', 'icon':'assets/imgs/sabah.png'},
    {'name':'perak', 'value':'perak', 'icon':'assets/imgs/perak.png'},
    {'name':'pahang', 'value':'pahang', 'icon':'assets/imgs/pahang.png'},
    {'name':'negeri sembilan', 'value':'negeri sembilan', 'icon':'assets/imgs/n9.png'},
    {'name':'kedah', 'value':'kedah', 'icon':'assets/imgs/kedah.png'},
    {'name':'melaka', 'value':'melaka', 'icon':'assets/imgs/melaka.png'},
    {'name':'terengganu', 'value':'terengganu', 'icon':'assets/imgs/terengganu.png'},
    {'name':'kelantan', 'value':'kelantan', 'icon':'assets/imgs/kelantan.png'},
    {'name':'perlis', 'value':'perlis', 'icon':'assets/imgs/perlis.png'},
    {'name':'putrajaya', 'value':'putrajaya', 'icon':'assets/imgs/putrajaya.png'}
  ];

  instituteStates = [];
  instituteRankingWorld = [
    {},
    {}
  ];
  instituteRankingAsia = [];
  instituteCategories = [
    {'total' : 0},
    {'total' : 0},
    {'total' : 0},
    {'total' : 0}
  ];

  constructor(
    public navCtrl: NavController,
    public global: GlobalProvider,
    public institute:Institute
  )
  {
      this.institute.getStates().subscribe(data =>{
        this.instituteStates = data.json();
      });

      this.institute.getCategories().subscribe(data =>{
        this.instituteCategories = data.json();
        this.getDoughtnut();
      });

      this.institute.getRankings('world').subscribe(data =>{
        this.instituteRankingWorld = data.json();
      });

      this.institute.getRankings('asia').subscribe(data =>{
        this.instituteRankingAsia = data.json();
      });
  }

  refresh(refresher){
    this.institute.getStates().subscribe(data =>{
      this.instituteStates = data.json();
    });

    this.institute.getCategories().subscribe(data =>{
      this.instituteCategories = data.json();
      this.getDoughtnut();
    });

    this.institute.getRankings('world').subscribe(data =>{
      this.instituteRankingWorld = data.json();
    });

    this.institute.getRankings('asia').subscribe(data =>{
      this.instituteRankingAsia = data.json();
      refresher.complete();
    });
  }

  getDoughtnut(){

    let app = this;

    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {

          type: 'doughnut',
          data: {
              labels: ["IPTA", "IPTS", "Kolej Komuniti", "Politeknik"],
              datasets: [{
                  label: '# of Votes',
                  data: [
                    app.instituteCategories[0]['total'],
                    app.instituteCategories[1]['total'],
                    app.instituteCategories[2]['total'],
                    app.instituteCategories[3]['total']
                  ],
                  backgroundColor: [
                      '#2962FF',
                      '#FFD600',
                      '#00C853',
                      '#D50000'
                  ],
              }]
          },
					datalabels: {
						anchor: 'center'
					},
          options : {
            maintainAspectRatio : false,
            pieceLabel: {
              render: 'label',
              fontColor: '#000',
              position: 'outside'
            },
          }

      });
  }

  getStateImage(name){
    let state = this.states.find(x => x.name == name.toLowerCase());

    if(state){
      return state.icon;
    }
    return '';
  }

  getInstituteImage(name){
    return 'assets/imgs/logo/' + name;
  }

  filterState(state){

    this.global.setState(state);

    var t: Tabs = this.navCtrl.parent;
        t.select(1);
  }

}

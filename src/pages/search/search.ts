import { Component, Renderer, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Keyboard  } from 'ionic-angular';
import { IonPullUpFooterState } from 'ionic-pullup';
import { Geolocation } from '@ionic-native/geolocation';
import { GlobalProvider } from '../../providers/global/global';

import { Institute } from '../../providers/api/institute';

import { ModalFilterPage } from '../modal-filter/modal-filter';
import { InfoPage } from '../info/info';
import geolib from 'geolib';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})

export class SearchPage {
  @ViewChild('searchbar') searchbar;

  footerState: IonPullUpFooterState;

  universityArray = [];
  universityOriginal = [];
  filterRange: number = 10000;
  filterType: String;
  filterSearch: String;
  filterState: String;
  filterProgram: String;
  filterFaculty: String;
  filterLevel: String;

  //state data
  states = [
    {'name':'all', 'value':''},
    {'name':'selangor', 'value':'Selangor'},
    {'name':'kuala lumpur', 'value':'Kuala Lumpur'},
    {'name':'sarawak', 'value':'Sarawak'},
    {'name':'johor', 'value':'Johor'},
    {'name':'penang', 'value':'Pulau Pinang'},
    {'name':'sabah', 'value':'Sabah'},
    {'name':'perak', 'value':'Perak'},
    {'name':'pahang', 'value':'Pahang'},
    {'name':'negeri sembilan', 'value':'Negeri Sembilan'},
    {'name':'kedah', 'value':'Kedah'},
    {'name':'terengganu', 'value':'Terengganu'},
    {'name':'kelantan', 'value':'Kelantan'},
    {'name':'perlis', 'value':'Perlis'}
  ];

  zoom: number = 8;
  lat:any = 3.120105;
  lng:any = 101.654553;

  tempLat:number = 3.120105;
  tempLng:number = 101.654553;

  footer_label:String = 'Search Result';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public geolocation: Geolocation,
    public global: GlobalProvider,
    public institute:Institute,
    public renderer:Renderer,
    public keyboard: Keyboard
  ) {

    this.getLocation();

    // this.getInstitute();

    this.footerState = IonPullUpFooterState.Collapsed;
  }

  ionViewDidLoad(){
      setTimeout(()=>{ this.getInstitute(); }, 100);
  }

  getInstitute(){

    let filter = {
      'search' : this.filterSearch,
      'type' : this.filterType,
      'state_name' : this.filterState,
      'program_code' : this.filterProgram,
      'faculty_code' : this.filterFaculty,
      'level' : this.filterLevel
    }

    // let loading = this.loadingCtrl.create({content:'Loading...'});
    // loading.present();
    this.footer_label = 'Loading...';
    this.universityArray = [];
    this.getLocation();

    this.institute.getData(filter).subscribe(data =>{
      // this.universityArray = data.json();
      let temp = data.json();
      let app = this;

      //change map property
      if(this.filterRange >= 10000){
        this.zoom = 11;
      }else if(this.filterRange >= 8000){
        this.zoom = 11;
      }else if(this.filterRange >= 6000){
        this.zoom = 12;
      }else if(this.filterRange >= 4000){
        this.zoom = 13;
      }else if(this.filterRange >= 2000){
        this.zoom = 13;
      }else if(this.filterRange >= 1000){
        this.zoom = 14;
      }else{
        this.zoom = 8;
      }

      if(this.filterRange != 0){
        temp.forEach(function(x) {
          let item = x;
          let inradius = false;

          if(!isNaN(parseFloat(item.lat))){

            inradius =  geolib.isPointInCircle(
              {latitude: parseFloat(item.lat), longitude: parseFloat(item.lng)},
              {latitude: parseFloat(app.lat), longitude: parseFloat(app.lng)},
              app.filterRange
            );
          }

          if(inradius){
            app.universityArray.push(item);
          }

        });

      }else{
        app.universityArray = data.json();
      }

      // loading.dismiss();
      app.footer_label = 'Search Result';
    });
  }

  searchFilter(event){
    this.filterSearch = event.srcElement.value; // search term
    this.getInstitute();
  }

  stateFilter(event){
    this.filterState = event; // search term

    this.getInstitute();
  }

  rangeFilter(event){
    // this.filterRange = event; // search term

    this.getInstitute();
  }

  openFilter() {
    let myModal = this.modalCtrl.create(ModalFilterPage, {
      'type' : this.filterType,
      'search' : this.filterSearch,
      'state_name' : this.filterState,
      'program_code' : this.filterProgram,
      'faculty_code' : this.filterFaculty,
      'level' : this.filterLevel
    });
    myModal.onDidDismiss(data => {
      this.filterType = data.type;
       this.filterState = data.state;
       this.filterProgram = data.program;
       this.filterFaculty = data.faculty;
       this.filterLevel = data.level;

       this.getInstitute();
    });
    myModal.present();
  }

  universityInfo(data){

    this.navCtrl.push(InfoPage, { data:data, lat:this.lat, lng:this.lng });
  }

  footerExpanded() {
  }

  footerCollapsed() {
  }

  toggleFooter() {
    this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
  }

  getLocation(){

    this.geolocation.getCurrentPosition().then((position) => {

      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;

    }, (err) => {
      console.log(err);
    });

  }

  mapFocus() {
    this.keyboard.close();
  }

}

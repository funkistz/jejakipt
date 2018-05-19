import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Institute } from '../../providers/api/institute';
import { Geolocation } from '@ionic-native/geolocation';
declare var google;
import geolib from 'geolib';

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;
  university:any = {
    name: 'loading...'
  };
  map: any;
  origin:any;
  destination: any;
  lat:any;
  lng:any;
  distance:any;
  segment: string = "info";
  segmentProgram: string = "diploma";
  groupedProgram:any;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public institute:Institute
  ) {

    this.getInstitute(this.navParams.get('data').id);
    this.origin = {lat: this.navParams.get('lat'), lng: this.navParams.get('lng')};

  }

  refresh(refresher){
    this.institute.find(this.navParams.get('data').id).subscribe(data =>{
      this.university = data.json();
      setTimeout(()=>{
        this.destination = {lat: this.getLat(), lng: this.getLng()}
        this.lat = this.getLat();
        this.lng = this.getLng();
        this.distance = geolib.getDistance(
          {latitude: this.getLat(), longitude: this.getLng()},
          {latitude: this.navParams.get('lat'), longitude: this.navParams.get('lng')}
        )/1000;

        this.loadMap();
        this.startNavigating();
        refresher.complete();
      }, 1000);
    });
  }

  getInstitute(id){

    this.institute.find(id).subscribe(data =>{
      this.university = data.json();

      this.groupedProgram = this.groupBy(this.university.institute_programs, program => program.level);

      setTimeout(()=>{
        this.destination = {lat: this.getLat(), lng: this.getLng()}
        this.lat = this.getLat();
        this.lng = this.getLng();
        this.distance = geolib.getDistance(
          {latitude: this.getLat(), longitude: this.getLng()},
          {latitude: this.navParams.get('lat'), longitude: this.navParams.get('lng')}
        )/1000;

        this.loadMap();
        this.startNavigating();
      }, 1000);
    });
  }

  getLat(){
    return parseFloat(this.university.lat);
  }

  getLng(){
    return parseFloat(this.university.lng);
  }


  ionViewDidLoad(){
    // this.loadMap();
  }

  loadMap(){

        let latLng = new google.maps.LatLng(this.lat, this.lng);

        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  startNavigating(){

      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;

      directionsDisplay.setMap(this.map);
      directionsDisplay.setPanel(this.directionsPanel.nativeElement);

      directionsService.route({
          origin: this.origin,
          destination: this.destination,
          travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, (res, status) => {

          if(status == google.maps.DirectionsStatus.OK){
              directionsDisplay.setDirections(res);
          } else {
              console.warn(status);
          }

      });

  }

  openMap(){
    let destination = this.getLat() + ',' + this.getLng();

    if(this.platform.is('ios')){
    	window.open('maps://?q=' + destination, '_system');
    } else {
    	let label = encodeURI(this.university.name);
    	window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
    }
  }

  getInstituteImage(name){
    return 'assets/imgs/logo/' + name;
  }

  getInstituteType(type){

    if(type == 1){
      return 'IPTA';
    }else if(type == 2){
      return 'IPTS';
    }else if(type == 3){
      return 'Community College';
    }else if(type == 3){
      return 'Polytechnic';
    }

    return '';
  }

  getInstituteLevel(type){

    if(type == 'k'){
      return 'Konvensional';
    }else if(type == 'p'){
      return 'Premier';
    }else if(type == 'r'){
      return 'Retro';
    }

    return '';
  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
  }

}

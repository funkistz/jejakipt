import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { StateProvider } from '../../providers/state/state';
import { Program } from '../../providers/api/program';
import { Faculty } from '../../providers/api/faculty';


@IonicPage()
@Component({
  selector: 'page-modal-filter',
  templateUrl: 'modal-filter.html',
})
export class ModalFilterPage {

  states = [];
  programs = [];
  faculties = [];
  filterType: String;
  filterSearch: String;
  filterState: String;
  filterProgram: String;
  filterFaculty: String;
  filterLevel: String;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public stateProvider: StateProvider,
    public programApi: Program,
    public facultyApi: Faculty
  )
  {
    this.states = this.stateProvider.getState();
    this.programApi.getData(null).subscribe(data =>{
      this.programs = data.json();
    });
    this.facultyApi.getData(null).subscribe(data =>{
      this.faculties = data.json();
    });

    this.filterType = navParams.get('type');
    this.filterSearch = navParams.get('search');
    this.filterState = navParams.get('state_name');
    this.filterProgram = navParams.get('program_code');
    this.filterFaculty = navParams.get('faculty_code');
    this.filterLevel = navParams.get('level');
  }

  closeModal() {

    let filter = {
      'type': this.filterType,
      'state': this.filterState,
      'program': this.filterProgram,
      'faculty': this.filterFaculty,
      'level': this.filterLevel,
    }

    this.viewCtrl.dismiss(filter);
  }

  reset() {
    this.filterType = null;
    this.filterSearch = null;
    this.filterState = null;
    this.filterProgram = null;
    this.filterFaculty = null;
    this.filterLevel = null;
  }

}

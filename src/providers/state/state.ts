import { Injectable } from '@angular/core';

/*
  Generated class for the StateStateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StateProvider {

  //state data
  states = [
    {'name':'all', 'value':'all'},
    {'name':'selangor', 'value':'selangor'},
    {'name':'kuala lumpur', 'value':'Kuala Lumpur'},
    {'name':'sarawak', 'value':'sarawak'},
    {'name':'johor', 'value':'johor'},
    {'name':'penang', 'value':'penang'},
    {'name':'sabah', 'value':'sabah'},
    {'name':'perak', 'value':'perak'},
    {'name':'pahang', 'value':'pahang'},
    {'name':'negeri sembilan', 'value':'negeri sembilan'},
    {'name':'kedah', 'value':'kedah'},
    {'name':'terengganu', 'value':'terengganu'},
    {'name':'kelantan', 'value':'kelantan'},
    {'name':'perlis', 'value':'perlis'}
  ];

  public getState(){
    return this.states;
  }

  public setState(state){
    this.states = state;
  }

}

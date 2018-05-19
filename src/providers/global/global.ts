import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  filterState:String = '';

  public getState(){
    return this.filterState;
  }

  public setState(state){
    this.filterState = state;
  }

}

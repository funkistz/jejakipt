import {Injectable} from '@angular/core';
import { ConnectionProvider } from '../connection/connection';

@Injectable()
export class Institute {

  constructor(public connection: ConnectionProvider) {}

  getData(param){

    if(param){
      return this.connection.getData('institute', param);
    }else{
      return this.connection.getData('institute', null);
    }

  }

  find(id){

    return this.connection.getData('institute/' + id, null);

  }

  getStates(){

    return this.connection.getData('institute/states', null);

  }

  getCategories(){

    return this.connection.getData('institute/categories', null);

  }

  getRankings(type){

    return this.connection.getData('institute/rankings/' + type, null);
  }

}

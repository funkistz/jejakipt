import {Injectable} from '@angular/core';
import { ConnectionProvider } from '../connection/connection';

@Injectable()
export class Program {

  constructor(public connection: ConnectionProvider) {}

  getData(param){

    if(param){
      return this.connection.getData('program', param);
    }else{
      return this.connection.getData('program', null);
    }

  }

  find(id){

    return this.connection.getData('program/' + id, null);

  }

}

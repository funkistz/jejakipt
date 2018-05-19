import {Injectable} from '@angular/core';
import { ConnectionProvider } from '../connection/connection';

@Injectable()
export class Faculty {

  constructor(public connection: ConnectionProvider) {}

  getData(param){

    if(param){
      return this.connection.getData('faculty', param);
    }else{
      return this.connection.getData('faculty', null);
    }

  }

  find(id){

    return this.connection.getData('faculty/' + id, null);

  }

}

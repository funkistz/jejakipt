import {Injectable} from '@angular/core';
import { ConnectionProvider } from '../connection/connection';

@Injectable()
export class News {

  constructor(public connection: ConnectionProvider) {}

  getData(param){

    if(param){
      return this.connection.getData('news', param);
    }else{
      return this.connection.getData('news', null);
    }

  }

  find(id){

    return this.connection.getData('news/' + id, null);

  }

}

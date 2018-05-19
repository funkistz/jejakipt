import { Injectable } from '@angular/core';
import { Http,Headers,RequestOptions, URLSearchParams } from '@angular/http';
import { DataSource } from '../data-source/data-source';
import 'rxjs/add/operator/map';

@Injectable()
export class ConnectionProvider {

    private root:string;

    constructor(public http: Http,public datasource: DataSource)
    {

      this.root = "http://fypdev1.hol.es/jejakipt/public/api/";

    }

    getData(api, params){

      let myHeaders = this.getHeaders();
      let myParams = new URLSearchParams();

      if(params){

        Object.keys(params).forEach((item) => {
          myParams.append(item, params[item]);
        });

        let options = new RequestOptions({ headers: myHeaders, params: myParams });

        return this.http.get( this.root + api, options )
        .map(res => res);

      }else{

        return this.http.get( this.root + api )
        .map(res => res);

      }

    }

    create(api, item):any {
      let result:any;
      let headers = this.getHeaders();

      let option = new RequestOptions({headers: headers});

      this.http.post( this.root + api ,JSON.stringify(item),option)
      .map(res => res )
      .subscribe(data =>{
            //console.log(data);
            this.datasource.source.push(data.json());
       });

      return result;
    }

    update(api, item):any {
      let result:any;
      let headers = this.getHeaders();

      this.http.put( this.root + api ,JSON.stringify(item), { headers: headers })
      .map(res => res)
      .subscribe(data =>{
            result = data;
       });

      return result;
    }


    delete(api, item):any {
      let result:any;
      let headers = this.getHeaders();

      this.http.delete( this.root + api + item,{headers: headers})
      .map(res => res)
      .subscribe(data =>{
            result = data;
       });

      return result;
    }

    getHeaders() {
      let headers = new Headers();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      return headers;
    }

}

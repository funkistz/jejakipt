import {Pipe} from '@angular/core';

@Pipe({
  name: 'markerIcon'
})
export class MarkerIcon {
  transform(value, args) {

    if(value == 1){
      return {
        url: "assets/icon/ipta.png",
        scaledSize: {
          height: 30,
          width: 30
        }
      };
    }else if(value == 2){
      return {
        url: "assets/icon/ipts.png",
        scaledSize: {
          height: 30,
          width: 30
        }
      };
    }else if(value == 3){
      return {
        url: "assets/icon/com.png",
        scaledSize: {
          height: 30,
          width: 30
        }
      };
    }else if(value == 4){
      return {
        url: "assets/icon/poly.png",
        scaledSize: {
          height: 30,
          width: 30
        }
      };
    }

  }
}

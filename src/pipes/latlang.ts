import {Pipe} from '@angular/core';

@Pipe({
  name: 'latLang'
})
export class LatLang {
  transform(value, args) {
    return parseFloat(value);
  }
}

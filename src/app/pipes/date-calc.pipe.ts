import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateCalc',
  standalone: true
})
export class DateCalcPipe implements PipeTransform {

  transform(value: Date, add: boolean, sub: boolean, count: number): unknown {
    if (value) {
      if ( add){
        return new Date(value.getTime() + count * 24 * 60 * 60 * 1000);
      }
      if ( sub){
        return new Date(value.getTime() - count * 24 * 60 * 60 * 1000);
      }
    }
    return value;
  }

}

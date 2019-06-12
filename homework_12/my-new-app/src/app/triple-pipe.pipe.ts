import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'triplePipe'
})
export class TriplePipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let resultValue = '';
    for (let i = 0; i < args; i++) {
      resultValue += ' ' + value;
    }

    return resultValue;
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanAndCapitalize'
})
export class CleanAndCapitalizePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    return value === null ? 'Not assigned' : this.capitalize(value.replace('_', ' '));
  }

  capitalize(value: String){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
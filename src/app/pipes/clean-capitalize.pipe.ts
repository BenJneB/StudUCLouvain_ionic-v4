import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanAndCapitalize'
})
export class CleanAndCapitalizePipe implements PipeTransform {
  transform(value: string, args: any[]): string {
    if (value === null){
      return 'Not assigned';
    };
    value = value.replace('_', ' ');
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
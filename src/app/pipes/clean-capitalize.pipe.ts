import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanAndCapitalize'
})
export class CleanAndCapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value === null ? 'Not assigned' : this.capitalize(value.replace(/_/g, ' '));
  }

  capitalize(value: String): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}

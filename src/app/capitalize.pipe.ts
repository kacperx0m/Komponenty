import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    return value.replace(/\b\w+\b/g, (match) => {
      // Capitalize the first letter only if the word has more than one letter
      return match.length > 1 ? match[0].toLocaleUpperCase() + match.substr(1) : match;
    });

  }

}

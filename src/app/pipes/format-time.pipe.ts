import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    if (value.includes('seconds')) {
      const seconds = parseInt(value.split(' ')[0], 10);  // Extract the number of seconds
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      return `00:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    }
    return 'The Doomsday Clock service is currently unavailable. ' +
      'We are working to resolve the issue.';  // Fallback for unexpected data
  }

  // Helper function to add leading zeroes to single digits
  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

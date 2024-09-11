import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    // Check for seconds format (e.g., "90 seconds")
    const secondsMatch = value.match(/(\d+)\sseconds/);
    // Check for minutes and seconds format (e.g., "two minutes and 30 seconds")
    const minutesAndSecondsMatch = value.match(/(\d+)\sminutes?\s(?:and\s(\d+)\sseconds?)?/);
    // Check for just minutes format (e.g., "two minutes")
    const minutesMatch = value.match(/(\d+)\sminutes?/);

    if (secondsMatch) {
      // Handle the "seconds" format
      const seconds = parseInt(secondsMatch[1], 10);
      return this.formatTimeFromSeconds(seconds);
    } else if (minutesAndSecondsMatch) {
      // Handle the "minutes and seconds" format
      const minutes = parseInt(minutesAndSecondsMatch[1], 10);
      const seconds = minutesAndSecondsMatch[2] ? parseInt(minutesAndSecondsMatch[2], 10) : 0;
      return this.formatTimeFromMinutesAndSeconds(minutes, seconds);
    } else if (minutesMatch) {
      // Handle the "minutes" format
      const minutes = parseInt(minutesMatch[1], 10);
      return this.formatTimeFromMinutes(minutes);
    }

    // Fallback for unknown formats
    return 'The Doomsday Clock service is currently unavailable.';
  }

  // Helper function to format based on seconds
  formatTimeFromSeconds(seconds: number): string {
    const totalMinutesToMidnight = 60;
    const remainingMinutes = Math.floor((totalMinutesToMidnight * 60 - seconds) / 60);
    const remainingSeconds = (60 - (seconds % 60)) % 60;  // Calculate the remaining seconds
    const hours = 23;  // Fixed 23:xx as hours stay at 23

    return `${this.pad(hours)}:${this.pad(remainingMinutes)}:${this.pad(remainingSeconds)}`;
  }

  // Helper function to format based on minutes and seconds
  formatTimeFromMinutesAndSeconds(minutes: number, seconds: number): string {
    const remainingMinutes = 60 - minutes;
    const remainingSeconds = (60 - seconds) % 60;
    const hours = 23;  // Fixed hours

    return `${this.pad(hours)}:${this.pad(remainingMinutes)}:${this.pad(remainingSeconds)}`;
  }

  // Helper function to format based on minutes only
  formatTimeFromMinutes(minutes: number): string {
    const remainingMinutes = 60 - minutes;
    const hours = 23;  // Fixed hours

    return `${this.pad(hours)}:${this.pad(remainingMinutes)}:00`;
  }

  // Helper function to pad single digits with leading zero
  pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

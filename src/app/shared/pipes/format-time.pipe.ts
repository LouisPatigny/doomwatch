import { Pipe, PipeTransform } from '@angular/core';

// Define the pipe with the name 'formatTime'
@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  // Mapping of textual numbers to numeric values.
  // This map allows converting text like "two" to the number 2, and "thirty" to 30, etc.
  private numberWordToDigit: Map<string, number> = new Map([
    ['zero', 0],
    ['one', 1],
    ['two', 2],
    ['three', 3],
    ['four', 4],
    ['five', 5],
    ['six', 6],
    ['seven', 7],
    ['eight', 8],
    ['nine', 9],
    ['ten', 10],
    ['eleven', 11],
    ['twelve', 12],
    ['thirteen', 13],
    ['fourteen', 14],
    ['fifteen', 15],
    ['sixteen', 16],
    ['seventeen', 17],
    ['eighteen', 18],
    ['nineteen', 19],
    ['twenty', 20],
    ['twenty-one', 21],
    ['twenty-two', 22],
    ['twenty-three', 23],
    ['twenty-four', 24],
    ['twenty-five', 25],
    ['twenty-six', 26],
    ['twenty-seven', 27],
    ['twenty-eight', 28],
    ['twenty-nine', 29],
    ['thirty', 30],
    ['thirty-one', 31],
    ['thirty-two', 32],
    ['thirty-three', 33],
    ['thirty-four', 34],
    ['thirty-five', 35],
    ['thirty-six', 36],
    ['thirty-seven', 37],
    ['thirty-eight', 38],
    ['thirty-nine', 39],
    ['forty', 40],
    ['forty-one', 41],
    ['forty-two', 42],
    ['forty-three', 43],
    ['forty-four', 44],
    ['forty-five', 45],
    ['forty-six', 46],
    ['forty-seven', 47],
    ['forty-eight', 48],
    ['forty-nine', 49],
    ['fifty', 50],
    ['fifty-one', 51],
    ['fifty-two', 52],
    ['fifty-three', 53],
    ['fifty-four', 54],
    ['fifty-five', 55],
    ['fifty-six', 56],
    ['fifty-seven', 57],
    ['fifty-eight', 58],
    ['fifty-nine', 59],
    ['sixty', 60]
  ]);

  // Predefine regex patterns for different time formats. These patterns help identify whether
  // the input string contains minutes, seconds, or both.
  private readonly secondsPattern = /(\d+|[a-zA-Z\s]+)\sseconds?/; // Looks for any number or text followed by "seconds"
  private readonly minutesPattern = /(\d+|[a-zA-Z\s]+)\sminutes?/; // Looks for any number or text followed by "minutes"
  private readonly minutesAndSecondsPattern = /(\d+|[a-zA-Z\s]+)\sminutes?\s(?:and\s(\d+|[a-zA-Z\s]+)\sseconds?)?/;
  // Looks for a phrase like "two minutes and thirty seconds"

  // The Main function of the pipe that gets executed when the pipe is used.
  // It receives the string (e.g., "two minutes and thirty seconds") and returns a formatted string like "23:58:30".
  transform(value: string): string {
    const totalSeconds = this.calculateTotalSeconds(value); // Converts the input into total seconds

    // If the total seconds could not be calculated, return a fallback error message.
    if (totalSeconds === null) {
      return 'The Doomsday Clock service is currently unavailable.';
    }

    // If valid seconds were calculated, format them as hours, minutes, and seconds.
    return this.formatTimeFromTotalSeconds(totalSeconds);
  }

  // Function to convert textual numbers into digits.
  // It works by splitting the text into words and checking each word in the `numberWordToDigit` map.
  // If a word represents a number (like "two" or "ten"), it is added to the total.
  private convertTextToNumber(text: string): number {
    return text.split(' ').reduce((total, word) => {
      const num = this.numberWordToDigit.get(word.toLowerCase()) ?? (isNaN(Number(word)) ? 0 : Number(word));
      // If it's a valid number in words, it is fetched from the map.
      // If it's already a number, it's added directly.
      return total + num;
    }, 0);
  }

  // Calculate total seconds based on the input format (whether it mentions seconds, minutes, or both).
  // Returns the total number of seconds to midnight, or null if the input does not match a recognized format.
  private calculateTotalSeconds(value: string): number | null {
    const minutesAndSecondsMatch = value.match(this.minutesAndSecondsPattern); // Check for minutes and seconds
    if (minutesAndSecondsMatch) {
      // Convert the text part for both minutes and seconds.
      const minutes = this.extractNumber(minutesAndSecondsMatch[1]);
      const seconds = minutesAndSecondsMatch[2] ? this.extractNumber(minutesAndSecondsMatch[2]) : 0;
      return (minutes * 60) + seconds; // Return the total number of seconds calculated from both minutes and seconds.
    }

    const minutesMatch = value.match(this.minutesPattern); // Check for just minutes
    if (minutesMatch) {
      const minutes = this.extractNumber(minutesMatch[1]); // Convert text to number for minutes
      return minutes * 60; // Convert the minutes into seconds
    }

    const secondsMatch = value.match(this.secondsPattern); // Check for just seconds
    if (secondsMatch) {
      return this.extractNumber(secondsMatch[1]); // Convert text to number for seconds
    }

    // If the input doesn't match any format, return null to signify an unrecognized format.
    return null;
  }

  // Helper function to extract a number from a text input (could be words or digits).
  // If it's a text representation of a number, it converts it using `convertTextToNumber`.
  // If it's already a number (like "120"), it returns it as-is.
  private extractNumber(input: string): number {
    return isNaN(Number(input)) ? this.convertTextToNumber(input) : Number(input);
  }

  // Format the remaining time based on the total seconds calculated from the input.
  // Assumes that the clock is always counting down from "23:00:00" to "00:00:00".
  private formatTimeFromTotalSeconds(totalSeconds: number): string {
    const totalSecondsInAnHour = 3600; // Defines the total number of seconds in an hour
    const remainingSeconds = totalSecondsInAnHour - totalSeconds; // Subtract the total seconds from an hour to get remaining time

    const hours = 23; // The hours are fixed at 23 (we're counting down to midnight)
    const minutes = Math.floor(remainingSeconds / 60); // Calculate the remaining minutes by dividing by 60
    const seconds = remainingSeconds % 60; // Calculate the remaining seconds

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`; // Format the time string as "23:mm:ss"
  }

  // Helper function to add a leading zero to single digits (e.g., "3" becomes "03").
  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`; // If the number is less than 10, prepend a '0' to the string.
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  // Main transform function: this method is called when the pipe is used in a template.
  // It receives the string input and converts it to the desired time format.
  transform(value: string): string {
    const totalSeconds = this.calculateTotalSeconds(value); // Convert the input string to total seconds.
    if (totalSeconds === null) {
      return 'The Doomsday Clock service is currently unavailable.'; // Return a message if the time format is invalid.
    }
    return this.formatTimeFromTotalSeconds(totalSeconds); // Format the total seconds into a time string.
  }

  // Helper function to parse the input string and calculate total seconds.
  // Returns null if the input is invalid or can't be parsed.
  private calculateTotalSeconds(value: string): number | null {
    const regex = /(\d+|[a-zA-Z\-]+)\s*(minutes?|seconds?)/g; // Regex to match numbers or words followed by 'minutes' or 'seconds'.
    let totalMinutes = 0;
    let totalSeconds = 0;
    let match;

    // Loop through all matches in the input string.
    while ((match = regex.exec(value)) !== null) {
      const numStr = match[1]; // Capture the number or word (e.g., "five", "10").
      const unit = match[2];   // Capture the time unit (either 'minute' or 'second').
      const num = this.wordToNumber(numStr); // Convert the word to a number (e.g., "five" becomes 5).
      if (isNaN(num)) {
        return null;  // If the number conversion fails, return null (invalid input).
      }
      // Add the converted number to either totalMinutes or totalSeconds.
      if (unit.startsWith('minute')) {
        totalMinutes += num;
      } else if (unit.startsWith('second')) {
        totalSeconds += num;
      }
    }

    // If no valid time values are found, return null.
    if (totalMinutes === 0 && totalSeconds === 0) {
      return null; // No valid time found
    }

    // Convert total time to seconds (minutes * 60 + seconds).
    return totalMinutes * 60 + totalSeconds;
  }

  // Converts a word (e.g., "five", "twenty-one") to a number.
  // Returns NaN if the word is not a valid number.
  private wordToNumber(word: string): number {
    word = word.toLowerCase().trim(); // Normalize the input for easier matching.
    if (word === 'zero') return 0; // Special case for zero.

    // Mapping of words to their numeric equivalents for units (1-9).
    const units: { [key: string]: number } = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
    };

    // Mapping for teen numbers (10-19).
    const teens: { [key: string]: number } = {
      'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
      'fourteen': 14, 'fifteen': 15, 'sixteen': 16,
      'seventeen': 17, 'eighteen': 18, 'nineteen': 19
    };

    // Mapping for tens (20, 30, 40, etc.).
    const tens: { [key: string]: number } = {
      'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
      'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    };

    let total = 0; // Initialize the total number.
    const words = word.split(/[\s-]+/); // Split words on spaces or hyphens (e.g., 'twenty-one').

    // Loop through each word to compute the numeric value.
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (teens[w]) {
        total += teens[w]; // If it's a teen word (10-19), add its value.
      } else if (tens[w]) {
        let tenValue = tens[w]; // For tens, get the value (e.g., "twenty" = 20).
        let unitValue = 0;
        if (i + 1 < words.length && units[words[i + 1]]) {
          unitValue = units[words[i + 1]]; // If there's a unit following the ten (e.g., "twenty-one"), add it.
          i++;
        }
        total += tenValue + unitValue; // Add both the ten and unit values.
      } else if (units[w]) {
        total += units[w]; // Add unit value directly (e.g., "three" = 3).
      } else if (!isNaN(Number(w))) {
        total += Number(w); // Convert numeric strings (e.g., "10").
      } else {
        return NaN; // Invalid word encountered.
      }
    }

    return total;
  }

  // Formats the total seconds into a "HH:MM:SS" format, accounting for Doomsday timing.
  private formatTimeFromTotalSeconds(totalSecondsUntilMidnight: number): string {
    const totalSecondsSince23 = 3600 - totalSecondsUntilMidnight; // Calculate how far past 23:00 (11 PM) we are.
    const currentTimeInSeconds = 23 * 3600 + totalSecondsSince23; // Calculate the current time in seconds since 00:00.

    const hours = Math.floor(currentTimeInSeconds / 3600) % 24; // Convert seconds to hours (mod 24 to wrap around midnight).
    const minutes = Math.floor((currentTimeInSeconds % 3600) / 60); // Convert the remaining seconds to minutes.
    const seconds = currentTimeInSeconds % 60; // Get the remaining seconds.

    // Return the formatted time string "HH:MM:SS".
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  // Pads numbers to two digits (e.g., 5 -> "05").
  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`; // Add a leading zero if the number is less than 10.
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: string): string {
    const totalSeconds = this.calculateTotalSeconds(value);
    if (totalSeconds === null) {
      return 'The Doomsday Clock service is currently unavailable.';
    }
    return this.formatTimeFromTotalSeconds(totalSeconds);
  }

  private calculateTotalSeconds(value: string): number | null {
    const regex = /(\d+|[a-zA-Z\-]+)\s*(minutes?|seconds?)/g;
    let totalMinutes = 0;
    let totalSeconds = 0;
    let match;

    while ((match = regex.exec(value)) !== null) {
      const numStr = match[1];
      const unit = match[2];
      const num = this.wordToNumber(numStr);
      if (isNaN(num)) {
        return null; // Invalid number word
      }
      if (unit.startsWith('minute')) {
        totalMinutes += num;
      } else if (unit.startsWith('second')) {
        totalSeconds += num;
      }
    }

    if (totalMinutes === 0 && totalSeconds === 0) {
      return null; // No valid time found
    }

    return totalMinutes * 60 + totalSeconds;
  }

  private wordToNumber(word: string): number {
    word = word.toLowerCase().trim();
    if (word === 'zero') return 0;

    const units: { [key: string]: number } = {
      'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
      'six': 6, 'seven': 7, 'eight': 8, 'nine': 9
    };

    const teens: { [key: string]: number } = {
      'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13,
      'fourteen': 14, 'fifteen': 15, 'sixteen': 16,
      'seventeen': 17, 'eighteen': 18, 'nineteen': 19
    };

    const tens: { [key: string]: number } = {
      'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
      'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90
    };

    let total = 0;
    const words = word.split(/[\s-]+/);

    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (teens[w]) {
        total += teens[w];
      } else if (tens[w]) {
        let tenValue = tens[w];
        let unitValue = 0;
        if (i + 1 < words.length && units[words[i + 1]]) {
          unitValue = units[words[i + 1]];
          i++;
        }
        total += tenValue + unitValue;
      } else if (units[w]) {
        total += units[w];
      } else if (!isNaN(Number(w))) {
        total += Number(w);
      } else {
        return NaN; // Invalid word
      }
    }

    return total;
  }

  private formatTimeFromTotalSeconds(totalSecondsUntilMidnight: number): string {
    const totalSecondsSince23 = 3600 - totalSecondsUntilMidnight;
    const currentTimeInSeconds = 23 * 3600 + totalSecondsSince23;

    const hours = Math.floor(currentTimeInSeconds / 3600) % 24;
    const minutes = Math.floor((currentTimeInSeconds % 3600) / 60);
    const seconds = currentTimeInSeconds % 60;

    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}`;
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}

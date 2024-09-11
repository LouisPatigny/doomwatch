import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoomsdayTestService {

  constructor() { }

  // Mock version of getDoomsdayClock to return different test cases
  getDoomsdayClock(): string {
    // Example cases we want to test
    const testCases = [
      '90 seconds to midnight',
      'two minutes to midnight',
      'two minutes and 30 seconds to midnight',
      '120 seconds to midnight',  // edge case: large number of seconds
      '30 seconds to midnight'   // edge case: small number of seconds
    ];

    // Return one of the test cases for each test
    return testCases[Math.floor(Math.random() * testCases.length)];
  }
}

import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { doomsdayClockResolver } from './doomsday-clock.resolver';

describe('doomsdayClockResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => doomsdayClockResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});

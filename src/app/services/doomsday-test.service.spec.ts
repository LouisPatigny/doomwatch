import { TestBed } from '@angular/core/testing';

import { DoomsdayTestService } from './doomsday-test.service';

describe('DoomsdayTestService', () => {
  let service: DoomsdayTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoomsdayTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

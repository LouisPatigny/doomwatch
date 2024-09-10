import { TestBed } from '@angular/core/testing';

import { DoomsdayService } from './doomsday.service';

describe('DoomsdayService', () => {
  let service: DoomsdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoomsdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoomsdayClockComponent } from './doomsday-clock.component';

describe('DoomsdayClockComponent', () => {
  let component: DoomsdayClockComponent;
  let fixture: ComponentFixture<DoomsdayClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoomsdayClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoomsdayClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

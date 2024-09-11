import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoomsdaySplashComponent } from './doomsday-splash.component';

describe('DoomsdaySplashComponent', () => {
  let component: DoomsdaySplashComponent;
  let fixture: ComponentFixture<DoomsdaySplashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoomsdaySplashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoomsdaySplashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

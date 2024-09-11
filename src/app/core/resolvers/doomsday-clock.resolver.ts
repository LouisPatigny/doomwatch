import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DoomsdayService } from '../services/doomsday.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoomsdayClockResolver implements Resolve<Observable<string>> {

  constructor(private doomsdayService: DoomsdayService) {}

  resolve() {
    // Fetch the clock data before navigating
    return this.doomsdayService.getDoomsdayClock();
  }
}

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { DoomsdayService } from '../services/doomsday.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoomsdayClockResolver implements Resolve<Observable<string>> {

  constructor(private doomsdayService: DoomsdayService) {
  }

  resolve() {
    const cachedData = sessionStorage.getItem('clockData');
    if (cachedData) {
      return of(cachedData); // Use cached data if available
    }

    return this.doomsdayService.getDoomsdayClock().pipe(
      tap(data => sessionStorage.setItem('clockData', data)) // Cache the data after fetching
    );
  }
}

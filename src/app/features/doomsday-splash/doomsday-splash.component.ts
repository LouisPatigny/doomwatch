import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DoomsdayService } from '../../core/services/doomsday.service';

@Component({
  selector: 'app-doomsday-splash',
  templateUrl: './doomsday-splash.component.html',
  styleUrls: ['./doomsday-splash.component.css']
})
export class DoomsdaySplashComponent implements OnInit {

  constructor(private router: Router, private doomsdayService: DoomsdayService) { }

  ngOnInit(): void {
    this.loadDoomsdayClockData();
  }

  loadDoomsdayClockData() {
    // Simulate data loading
    this.doomsdayService.getDoomsdayClock().subscribe({
      next: (data) => {
        // Once the data is loaded, navigate to the clock component
        this.router.navigate(['/clock']).then(
          () => console.log('Navigation successful!'),
          (error) => console.error('Navigation error:', error)
        );
      },
      error: (error) => {
        console.error('Error loading Doomsday Clock data', error);
        // In case of error, navigate to the clock component anyway
        this.router.navigate(['/clock']).then(
          () => console.log('Navigation successful despite error!'),
          (error) => console.error('Navigation error:', error)
        );
      }
    });
  }
}

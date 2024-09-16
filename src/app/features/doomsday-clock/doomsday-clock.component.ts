import { Component, OnInit } from '@angular/core';
import { DoomsdayService } from '../../core/services/doomsday.service';
import { ActivatedRoute, Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-doomsday-clock',
  templateUrl: './doomsday-clock.component.html',
  styleUrls: ['./doomsday-clock.component.css']
})
export class DoomsdayClockComponent implements OnInit {
  clockTime: string = '';  // Variable to hold the clock time

  constructor(
    private doomsdayService: DoomsdayService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    // Get the resolved data from the resolver before the component loads
    this.clockTime = this.route.snapshot.data['clockData'];

    // Continue polling the API every 5 minutes (300000 ms)
    interval(300000).subscribe(() => {
      this.updateClockTime();
    });
  }

  private updateClockTime(): void {
    this.doomsdayService.getDoomsdayClock().subscribe({
      next: data => {
        this.clockTime = data;
      },
      error: error => {
        console.error('Error fetching clock data:', error);
      }
    });
  }

  // Method to navigate to the history timeline
  openTimeline(): void {
    this.router.navigate(['/history']).then(
      () => console.log('Navigated to the history timeline'),
      (error) => console.error('Failed to navigate to history:', error)
    );
  }

  // Method to navigate to the history timeline
  openAbout(): void {
    this.router.navigate(['/about']).then(
      () => console.log('Navigated to the history timeline'),
      (error) => console.error('Failed to navigate to history:', error)
    );
  }
}

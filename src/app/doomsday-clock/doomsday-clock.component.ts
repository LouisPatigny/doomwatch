import { Component, OnInit } from '@angular/core';
import { DoomsdayService } from '../services/doomsday.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-doomsday-clock',
  templateUrl: './doomsday-clock.component.html',
  styleUrls: ['./doomsday-clock.component.css']
})
export class DoomsdayClockComponent implements OnInit {
  clockTime: string = '';

  constructor(private doomsdayService: DoomsdayService) {
  }

  ngOnInit(): void {
    // Call the Backend at startup
    this.doomsdayService.getDoomsdayClock().subscribe({
      next: data => {
        this.clockTime = data;
      },
      error: error => {
        console.error('Full Error:', error);
      }
    });

    // Continue polling the API every 5 minutes (300000 ms)
    interval(300000).subscribe(() => {
      this.doomsdayService.getDoomsdayClock().subscribe({
          next: data => {
            this.clockTime = data;
          },
          error: error => {
            console.error('Full Error:', error);
          }
        }
      );
    });
  }
}

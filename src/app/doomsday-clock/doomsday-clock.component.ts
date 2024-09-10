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
  errorMessage: string = '';  // Store error message if API fails

  constructor(private doomsdayService: DoomsdayService) {
  }

  ngOnInit(): void {
    // Call the API immediately
    this.doomsdayService.getDoomsdayClock().subscribe(
      data => {
        this.clockTime = data;  // Update with the fetched data
      },
      error => {
        console.error('Full Error:', error);  // Log the full error object
      }
    );

    // Continue polling the API every 5 minutes (300000 ms)
    interval(300000).subscribe(() => {
      this.doomsdayService.getDoomsdayClock().subscribe(
        data => {
          this.clockTime = data;  // Update with the fetched data
        },
        error => {
          console.error('Full Error:', error);  // Log the full error object
        }
      );
    });
  }
}

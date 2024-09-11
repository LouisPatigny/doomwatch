import { Component, OnInit } from '@angular/core';
import { DoomsdayService } from '../../core/services/doomsday.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-doomsday-clock',
  templateUrl: './doomsday-clock.component.html',
  styleUrls: ['./doomsday-clock.component.css']
})
export class DoomsdayClockComponent implements OnInit {
  clockTime: string = '';  // Variable to hold the clock time

  constructor(private doomsdayService: DoomsdayService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the resolved data from the resolver before the component loads
    this.clockTime = this.route.snapshot.data['clockData'];

    // Continue polling the API every 5 minutes (300 000 ms)
    interval(300000).subscribe(() => {
      this.doomsdayService.getDoomsdayClock().subscribe({
        next: data => {
          this.clockTime = data;
        },
        error: error => {
          console.error('Full Error:', error);
        }
      });
    });
  }
}

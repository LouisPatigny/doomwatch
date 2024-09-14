import { Component, OnInit } from '@angular/core';
import { DoomsdayHistoryService } from '../../../core/services/history-timeline.service';
import { ClockEvent } from "./models/clock-event.model";

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.css']
})
export class HistoryTimelineComponent implements OnInit {
  clockEvents: ClockEvent[] = [];  // All events
  currentIndex: number = 0;  // Track the current event
  isTransitioning: boolean = false;  // Track if we are in the middle of an animation

  constructor(private historyService: DoomsdayHistoryService) {}

  ngOnInit(): void {
    // Fetch the history events from the service
    this.historyService.getDoomsdayHistory().subscribe((data: ClockEvent[]) => {
      this.clockEvents = data;
      this.currentIndex = 0;  // Start at the first event
    });
  }

  // Method to get the current event
  get currentEvent(): ClockEvent {
    return this.clockEvents[this.currentIndex];
  }

  // Navigate to the next event (if available)
  nextEvent(): void {
    if (this.isTransitioning) return;  // Prevent double-click during animation
    if (this.currentIndex < this.clockEvents.length - 1) {
      this.isTransitioning = true;
      this.applyAnimation('slide-out-left', 'slide-in-right', () => {
        this.currentIndex++;
        this.isTransitioning = false;
      });
    }
  }

  // Navigate to the previous event (if available)
  previousEvent(): void {
    if (this.isTransitioning) return;  // Prevent double-click during animation
    if (this.currentIndex > 0) {
      this.isTransitioning = true;
      this.applyAnimation('slide-out-right', 'slide-in-left', () => {
        this.currentIndex--;
        this.isTransitioning = false;
      });
    }
  }

  // Check if there is a next event
  get hasNextEvent(): boolean {
    return this.currentIndex < this.clockEvents.length - 1;
  }

  // Check if there is a previous event
  get hasPreviousEvent(): boolean {
    return this.currentIndex > 0;
  }

  // Apply animations when transitioning between events
  applyAnimation(outClass: string, inClass: string, callback: () => void): void {
    const container = document.querySelector('.history-timeline-container');
    if (container) {
      container.classList.add(outClass);
      setTimeout(() => {
        callback();  // Call the callback to update the event
        container.classList.remove(outClass);
        container.classList.add(inClass);
        setTimeout(() => {
          container.classList.remove(inClass);
        }, 300);  // Match the CSS animation duration
      }, 300);  // Match the CSS animation duration
    }
  }

  // Close the timeline (you can define this functionality later)
  closeTimeline(): void {
    console.log('Closing the timeline');
    // Logic to close or navigate away from the timeline view
  }
}

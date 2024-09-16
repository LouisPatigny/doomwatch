import { Component, OnInit } from '@angular/core';
import { DoomsdayHistoryService } from '../../../core/services/history-timeline.service';
import { ClockEvent } from "./models/clock-event.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-history-timeline',
  templateUrl: './history-timeline.component.html',
  styleUrls: ['./history-timeline.component.css']
})
export class HistoryTimelineComponent implements OnInit {
  clockEvents: ClockEvent[] = [];  // All events
  currentIndex: number = 0;  // Track the current event
  isTransitioning: boolean = false;  // Track if we are in the middle of an animation

  private touchStartX: number = 0;  // Track the starting X position of a touch
  private touchEndX: number = 0;    // Track the ending X position of a touch
  private swipeThreshold: number = 50;  // Minimum distance for a swipe

  constructor(
    private historyService: DoomsdayHistoryService,
    private router: Router,
    ) {}

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
    if (!this.isTransitioning && this.hasNextEvent) {
      this.triggerAnimation('slide-out-left', 'slide-in-right', () => this.currentIndex++);
    }
  }

  // Navigate to the previous event (if available)
  previousEvent(): void {
    if (!this.isTransitioning && this.hasPreviousEvent) {
      this.triggerAnimation('slide-out-right', 'slide-in-left', () => this.currentIndex--);
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
  private triggerAnimation(outClass: string, inClass: string, updateIndex: () => void): void {
    this.isTransitioning = true;
    const container = document.querySelector('.history-timeline-container');
    if (container) {
      container.classList.add(outClass);
      setTimeout(() => {
        updateIndex();
        container.classList.remove(outClass);
        container.classList.add(inClass);
        setTimeout(() => {
          container.classList.remove(inClass);
          this.isTransitioning = false;
        }, 300);
      }, 300);
    }
  }

  // Detecting and handling swipe gestures
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
  }

  private handleSwipeGesture(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;
    if (Math.abs(swipeDistance) > this.swipeThreshold) {
      if (swipeDistance < 0 && this.hasNextEvent) {
        this.nextEvent();  // Swipe left to go to the next event
      } else if (swipeDistance > 0 && this.hasPreviousEvent) {
        this.previousEvent();  // Swipe right to go to the previous event
      }
    }
  }

  // Close the timeline (you can define this functionality later)
  closeTimeline(): void {
    this.router.navigate(['/clock']).then(() => {
      console.log('Closing the timeline');
    });
  }
}

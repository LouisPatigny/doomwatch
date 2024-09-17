import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  // Settings properties with default values
  notificationsEnabled: boolean = true;
  midnightAlarmEnabled: boolean = true;
  selectedAlarmSound: string = 'Audio1';  // Default sound set here

  // Predefined alarm sounds
  alarmSounds: string[] = ['Audio1', 'Audio2', 'Audio3'];

  // Variable to keep track of the currently playing audio
  private currentAudio: HTMLAudioElement | null = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // Load settings from localStorage or set defaults
    this.loadSettings();
    // If no selected sound, set it to default
    if (!this.selectedAlarmSound) {
      this.selectedAlarmSound = 'Audio1';
      this.saveSettings();  // Ensure default is saved
    }
  }

  // Method to load settings from localStorage
  loadSettings(): void {
    const settings = JSON.parse(localStorage.getItem('doomwatchSettings') || '{}');
    this.notificationsEnabled = settings.notificationsEnabled ?? this.notificationsEnabled;
    this.midnightAlarmEnabled = settings.midnightAlarmEnabled ?? this.midnightAlarmEnabled;
    this.selectedAlarmSound = settings.selectedAlarmSound ?? this.selectedAlarmSound;
  }

  // Method to save settings to localStorage
  saveSettings(): void {
    const settings = {
      notificationsEnabled: this.notificationsEnabled,
      midnightAlarmEnabled: this.midnightAlarmEnabled,
      selectedAlarmSound: this.selectedAlarmSound,
    };
    localStorage.setItem('doomwatchSettings', JSON.stringify(settings));
  }

  // Method to handle changes in settings
  onSettingsChange(): void {
    this.saveSettings();
  }

  // Method to play or pause the audio preview, handling the logic for only one sound playing at a time
  playPreview(sound: string): void {
    // If an audio is currently playing, and it's the same sound, pause it
    if (this.currentAudio && this.currentAudio.src.includes(sound)) {
      if (!this.currentAudio.paused) {
        this.currentAudio.pause();
        return;
      }
    }

    // Stop the currently playing audio (if any)
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;  // Reset its playback
    }

    // Create a new Audio object for the clicked sound
    this.currentAudio = new Audio(`/sounds/${sound}.mp3`);
    this.currentAudio.play().then(() => {
      console.log(`Playing preview sound: ${sound}`);
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  // New method to handle selection of alarm sound
  selectAlarmSound(sound: string): void {
    this.selectedAlarmSound = sound;
    this.saveSettings();  // Save the selected sound to localStorage
  }

  // Close the 'Settings' page and navigate back to the 'clock' page
  closeSettings(): void {
    this.router.navigate(['/clock'], {
      state: { cached: true },  // Preserving state by marking it as cached
      replaceUrl: true,         // Replace the current URL to avoid adding to history
    }).then(() => {
      console.log('Closing "Settings" and navigating to the clock page');
    });
  }
}

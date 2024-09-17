import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})

export class AboutComponent {

  constructor(
    private router: Router
  )
  {}

// Close the 'about' page and navigate back to the 'clock' page
  closeAbout(): void {
    this.router.navigate(['/clock'], {
      state: { cached: true },  // Preserving state by marking it as cached
      replaceUrl: true,         // Replace the current URL to avoid adding to history
    }).then(() => {
      console.log('Closing \"About\" and navigating to the clock page');
    });
  }
}

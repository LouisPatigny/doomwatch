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

  // Close the timeline (you can define this functionality later)
  closeAbout(): void {
    this.router.navigate(['/clock']).then(() => {
      console.log('Closing the timeline');
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set a timeout to automatically navigate to the clock after 3 seconds (3000 ms)
    setTimeout(() => {
      this.router.navigate(['/clock']).then(
        () => {
          console.log('Navigation successful!');
        },
        (error) => {
          console.error('Navigation error:', error);
        }
      );
    }, 3000);  // Adjust the timing here if you want a different splash duration
  }
}

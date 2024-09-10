import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from "@angular/common/http";
import { DoomsdayClockComponent } from './doomsday-clock/doomsday-clock.component';
import { FormatTimePipe } from './pipes/format-time.pipe';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    DoomsdayClockComponent,
    FormatTimePipe
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
  providers: [
    provideHttpClient()  // Use this instead of HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

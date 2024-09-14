import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from "@angular/common/http";
import { DoomsdayClockComponent } from './features/doomsday-clock/doomsday-clock.component';
import { FormatTimePipe } from './shared/pipes/format-time.pipe';
import { NgOptimizedImage } from "@angular/common";
import { DoomsdaySplashComponent } from './features/doomsday-splash/doomsday-splash.component';

@NgModule({
  declarations: [
    AppComponent,
    DoomsdayClockComponent,
    FormatTimePipe,
    DoomsdaySplashComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage
    ],
  providers: [
    provideHttpClient()  // HttpClientModule = Depreciated
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

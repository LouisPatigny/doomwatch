import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from "@angular/common/http";
import { DoomsdayClockComponent } from './features/doomsday-clock/doomsday-clock.component';
import { FormatTimePipe } from './shared/pipes/format-time.pipe';
import { NgOptimizedImage } from "@angular/common";
import { DoomsdaySplashComponent } from './features/doomsday-splash/doomsday-splash.component';
import { AboutComponent } from './features/about/about.component';
import { SettingsComponent } from './features/settings/settings.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    DoomsdayClockComponent,
    FormatTimePipe,
    DoomsdaySplashComponent,
    AboutComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgOptimizedImage,
    FormsModule
  ],
  providers: [
    provideHttpClient()  // HttpClientModule = Depreciated
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

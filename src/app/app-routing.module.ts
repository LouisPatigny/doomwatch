import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { DoomsdaySplashComponent } from './features/doomsday-splash/doomsday-splash.component';
import { DoomsdayClockComponent } from './features/doomsday-clock/doomsday-clock.component';
import {DoomsdayClockResolver} from "./core/resolvers/doomsday-clock.resolver";

const routes: Routes = [
  { path: '', component: DoomsdaySplashComponent },
  { path: 'clock', component: DoomsdayClockComponent, resolve: { clockData: DoomsdayClockResolver } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

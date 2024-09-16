import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { DoomsdaySplashComponent } from './features/doomsday-splash/doomsday-splash.component';
import { DoomsdayClockComponent } from './features/doomsday-clock/doomsday-clock.component';
import {DoomsdayClockResolver} from "./core/resolvers/doomsday-clock.resolver";
import {AboutComponent} from "./features/about/about.component";

const routes: Routes = [
  { path: '', component: DoomsdaySplashComponent },
  { path: 'clock', component: DoomsdayClockComponent, resolve: { clockData: DoomsdayClockResolver } },
  { path: 'history', loadChildren: () => import('./features/history/history.module').then(m => m.HistoryModule) },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/clock' }, // Wildcard route for a 404 page or redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

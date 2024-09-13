import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryTimelineComponent } from './history-timeline/history-timeline.component';

const routes: Routes = [
  { path: '', component: HistoryTimelineComponent }  // Route for the history timeline
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }

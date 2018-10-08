import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './logs.component';

const logsRoutes: Routes = [
  { path: '', component: LogsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(logsRoutes)
  ],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
export const logsRoutingComponents = [LogsComponent];

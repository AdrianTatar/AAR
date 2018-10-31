import { ExportComponent } from './export.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const expRoutes: Routes = [
  { path: '', component: ExportComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(expRoutes)
  ],
  exports: [RouterModule]
})

export class ExpRoutingModule { }
export const expRoutingComponents = [ExportComponent];

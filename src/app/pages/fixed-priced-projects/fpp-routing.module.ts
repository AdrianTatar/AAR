import { NgModule } from '@angular/core';
import { FixedPricedProjectsComponent } from './fixed-priced-projects.component';
import { Routes, RouterModule } from '@angular/router';

const fppRoutes: Routes = [
  { path: '', component: FixedPricedProjectsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(fppRoutes)
  ],
  exports: [RouterModule]
})

export class FppRoutingModule { }
export const fppRoutingComponents = [FixedPricedProjectsComponent];

import { NgModule } from '@angular/core';
import { FixedPriceProjectsComponent } from './fixed-price-projects.component';
import { Routes, RouterModule } from '@angular/router';

const fppRoutes: Routes = [
  { path: '', component: FixedPriceProjectsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(fppRoutes)
  ],
  exports: [RouterModule]
})

export class FppRoutingModule { }
export const fppRoutingComponents = [FixedPriceProjectsComponent];

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurchargeCustomersComponent } from './surcharge-customers.component';

const scRoutes: Routes = [
  { path: '', component: SurchargeCustomersComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(scRoutes)
  ],
  exports: [RouterModule]
})

export class ScRoutingModule { }
export const scRoutingComponents = [SurchargeCustomersComponent];

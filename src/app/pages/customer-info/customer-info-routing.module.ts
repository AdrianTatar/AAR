import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerInfoComponent } from './customer-info.component';


const customerInfoRoutes: Routes = [
  { path: '', component: CustomerInfoComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(customerInfoRoutes)
  ],
  exports: [RouterModule]
})

export class CustomerInfoRoutingModule { }
export const customerInfoRoutingComponents = [CustomerInfoComponent];

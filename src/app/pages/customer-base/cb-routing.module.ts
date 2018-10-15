import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerBaseComponent } from './customerbase.component';


const cbRoutes: Routes = [
  { path: '', component: CustomerBaseComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(cbRoutes)
  ],
  exports: [RouterModule]
})

export class CbRoutingModule { }
export const cbRoutingComponents = [CustomerBaseComponent];

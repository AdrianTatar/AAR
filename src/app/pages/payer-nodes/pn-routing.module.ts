import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PayerNodesComponent } from './payernodes.component';

const pnRoutes: Routes = [
  { path: '', component: PayerNodesComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(pnRoutes)
  ],
  exports: [RouterModule]
})
export class PnRoutingModule { }
export const pnRoutingComponents = [PayerNodesComponent];

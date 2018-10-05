import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZahlerknotenComponent } from './zahlerknoten.component';

const zkRoutes: Routes = [
  { path: '', component: ZahlerknotenComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(zkRoutes)
  ],
  exports: [RouterModule]
})
export class ZkRoutingModule { }
export const zkRoutingComponents = [ZahlerknotenComponent];

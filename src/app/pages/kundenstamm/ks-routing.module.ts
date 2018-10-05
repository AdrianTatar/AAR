import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KundenstammComponent } from './kundenstamm.component';


const ksRoutes: Routes = [
  { path: '', component: KundenstammComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(ksRoutes)
  ],
  exports: [RouterModule]
})

export class KsRoutingModule { }
export const ksRoutingComponents = [KundenstammComponent];

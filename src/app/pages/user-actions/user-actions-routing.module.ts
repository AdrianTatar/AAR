import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserActionsComponent } from './user-actions.component';

const userActionsRoutes: Routes = [
  { path: '', component: UserActionsComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(userActionsRoutes)
  ],
  exports: [RouterModule]
})
export class UserActionsRoutingModule { }
export const userActionsRoutingComponents = [UserActionsComponent];

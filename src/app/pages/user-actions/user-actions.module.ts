import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActionsRoutingModule, userActionsRoutingComponents } from './user-actions-routing.module';
import { UserActionsService } from './services/user-actions.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    UserActionsRoutingModule,
    SharedModule
  ],
  declarations: [
    userActionsRoutingComponents
  ],
  providers: [
    UserActionsService
  ]
})
export class UserActionsModule { }

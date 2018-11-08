import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserActionsRoutingModule, userActionsRoutingComponents } from './user-actions-routing.module';
import { UserActionsService } from './services/user-actions.service';
import { SharedModule } from '../../shared/shared.module';
import { TimestampPipe } from './utils/TimestampPipe';

@NgModule({
  imports: [
    CommonModule,
    UserActionsRoutingModule,
    SharedModule
  ],
  declarations: [
    userActionsRoutingComponents,
    TimestampPipe
  ],
  providers: [
    UserActionsService
  ]
})
export class UserActionsModule { }

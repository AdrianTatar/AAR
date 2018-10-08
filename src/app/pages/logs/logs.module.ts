import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogsRoutingModule, logsRoutingComponents } from './logs-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    LogsRoutingModule,
    SharedModule
  ],
  declarations: [
    logsRoutingComponents
  ],
  providers: [
    UserService
  ]
})
export class LogsModule { }

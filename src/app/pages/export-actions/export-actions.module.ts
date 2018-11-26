import { ExportActionsService } from './services/export-actions.service';
import { TimestampPipe } from './utils/TimestampPipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ExportActionsRoutingModule, exportActionsRoutingComponents } from './export-actions-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ExportActionsRoutingModule,
    SharedModule
  ],
  declarations: [
    exportActionsRoutingComponents,
    TimestampPipe
  ],
  providers: [
    ExportActionsService
  ]
})
export class ExportActionsModule { }

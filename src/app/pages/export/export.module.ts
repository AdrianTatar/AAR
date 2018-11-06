import { ExportService } from './services/export.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ExpRoutingModule, expRoutingComponents } from './export-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ExpRoutingModule,
    SharedModule
  ],
  declarations: [
    expRoutingComponents
  ],
  entryComponents: [
  ],
  providers: [
    ExportService
  ]
})
export class ExpModule { }

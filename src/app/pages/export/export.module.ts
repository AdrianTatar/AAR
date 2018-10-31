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
  ]
})
export class ExpModule { }

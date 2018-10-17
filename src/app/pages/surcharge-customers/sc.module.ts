import { SurchargeCustomersRateService } from './surchargecustomersrates/services/surcharge-customers-rates.service';
import { SurchargeCustomersRateComponent } from './surchargecustomersrates/surchargecustomersrate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { scRoutingComponents, ScRoutingModule } from './sc-routing.module';
import { ScAddDialogComponent } from './sc-add-dialog/sc-add-dialog.component';
import { ScEditDialogComponent } from './sc-edit-dialog/sc-edit-dialog.component';
import { SurchargeCustomersService } from './services/surcharge-customers.service';

@NgModule({
  imports: [
    CommonModule,
    ScRoutingModule,
    SharedModule
  ],
  declarations: [
    scRoutingComponents,
    ScAddDialogComponent,
    ScEditDialogComponent,
    SurchargeCustomersRateComponent
  ],
  entryComponents: [
    ScAddDialogComponent,
    ScEditDialogComponent
  ],
  providers: [
    SurchargeCustomersService,
    SurchargeCustomersRateService
  ]
})
export class ScModule { }

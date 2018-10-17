import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { SurchargeCustomersRateService } from './services/surcharge-customers-rates.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
  ],
  entryComponents: [
  ],
  providers: [
    SurchargeCustomersRateService
  ]
})
export class ScrModule { }

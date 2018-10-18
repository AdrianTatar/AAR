import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { SurchargeCustomersRateService } from './services/surcharge-customers-rates.service';
import { ScrAddDialogComponent} from './scr-add-dialog/scr-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    ScrAddDialogComponent
  ],
  entryComponents: [
    ScrAddDialogComponent
  ],
  providers: [
    SurchargeCustomersRateService
  ]
})
export class ScrModule { }

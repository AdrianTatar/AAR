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
    ScEditDialogComponent
  ],
  entryComponents: [
    ScAddDialogComponent,
    ScEditDialogComponent
  ],
  providers: [
    SurchargeCustomersService
  ]
})
export class ScModule { }

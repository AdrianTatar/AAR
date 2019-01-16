import { CustomerInfoService } from './services/customer-info.service';
import { CustomerInfoAddDialogComponent } from './customer-info-add-dialog/customer-info-add-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoRoutingModule, customerInfoRoutingComponents } from './customer-info-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CustomerInfoRoutingModule,
    SharedModule
  ],
  declarations: [
    customerInfoRoutingComponents,
    CustomerInfoAddDialogComponent
  ],
  entryComponents: [
    CustomerInfoAddDialogComponent
  ],
  providers: [
    CustomerInfoService
  ]
})
export class CustomerInfoModule { }

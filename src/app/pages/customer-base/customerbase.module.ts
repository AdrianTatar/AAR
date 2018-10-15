import { CustomerBaseService } from './services/customer-base.service';
import { CbAddDialogComponent } from './cb-add-dialog/cb-add-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CbRoutingModule, cbRoutingComponents } from './cb-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CbRoutingModule,
    SharedModule
  ],
  declarations: [
    cbRoutingComponents,
    CbAddDialogComponent
  ],
  entryComponents: [
    CbAddDialogComponent
  ],
  providers: [
    CustomerBaseService
  ]
})
export class CustomerBaseModule { }

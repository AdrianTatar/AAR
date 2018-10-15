import { PayerNodeService } from './services/payernode.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnRoutingModule, pnRoutingComponents } from './pn-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PnAddDialogComponent } from './pn-add-dialog/pn-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    PnRoutingModule,
    SharedModule
  ],
  declarations: [
    pnRoutingComponents,
    PnAddDialogComponent
  ],
  entryComponents: [
    PnAddDialogComponent
  ],
  providers: [
    PayerNodeService
  ]
})
export class PnModule { }

import { NgModule } from '@angular/core';
import { fppRoutingComponents, FppRoutingModule } from './fpp-routing.module';
import { FppAddDialogComponent } from './fpp-add-dialog/fpp-add-dialog.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { FixedPriceProjectService } from './services/fixed-price-project.service';

@NgModule({
  imports: [
    CommonModule,
    FppRoutingModule,
    SharedModule
  ],
  declarations: [
    fppRoutingComponents,
    FppAddDialogComponent
  ],
  entryComponents: [
    FppAddDialogComponent
  ],
  providers: [
    FixedPriceProjectService
  ]
})
export class FppModule { }

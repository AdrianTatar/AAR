import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { scRoutingComponents, ScRoutingModule } from './sc-routing.module';
import { ScAddDialogComponent } from './sc-add-dialog/sc-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ScRoutingModule,
    SharedModule
  ],
  declarations: [
    scRoutingComponents,
    ScAddDialogComponent
  ],
  entryComponents: [
    ScAddDialogComponent
  ]
})
export class ScModule { }

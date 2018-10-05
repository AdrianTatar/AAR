import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KsRoutingModule, ksRoutingComponents } from './ks-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { KunAddDialogComponent } from './kun-add-dialog/kun-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    KsRoutingModule,
    SharedModule
  ],
  declarations: [
    ksRoutingComponents,
    KunAddDialogComponent
  ],
  entryComponents: [
    KunAddDialogComponent
  ]
})
export class KundenstammModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZkRoutingModule, zkRoutingComponents } from './zk-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ZahAddDialogComponent } from './zah-add-dialog/zah-add-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    ZkRoutingModule,
    SharedModule
  ],
  declarations: [
    zkRoutingComponents,
    ZahAddDialogComponent
  ],
  entryComponents: [
    ZahAddDialogComponent
  ]
})
export class ZkModule { }

import { ExpAddDialogComponent } from './exp-add-dialog/exp-add-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExpAddDialogComponent
  ],
  declarations: [
    ExpAddDialogComponent
  ],
  entryComponents: [
    ExpAddDialogComponent
  ],
  exports: [
    ExpAddDialogComponent
  ],
  providers: [
  ]
})
export class NavbarModule { }

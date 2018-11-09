import { NgModule } from '@angular/core';

import { MaterialsModule } from './materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { UserActionsCreateService } from './services/user-actions-create.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    TranslateModule
  ],
  providers: [
    UserActionsCreateService,
    CookieService
  ]
})
export class SharedModule { }

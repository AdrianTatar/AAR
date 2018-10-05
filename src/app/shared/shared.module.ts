import { NgModule } from '@angular/core';

import { MaterialsModule } from '../shared/materials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Ngx-Translate
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    })
  ],
  exports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    TranslateModule
  ]
})
export class SharedModule { }

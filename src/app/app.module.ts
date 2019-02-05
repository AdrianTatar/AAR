import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { routingComponents } from './routing.module';
import { RoutingModule } from './routing.module';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

// Ngx-Translate
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ExpAddDialogComponent } from './shared/components/navbar/exp-add-dialog/exp-add-dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    ExpAddDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
    RoutingModule,
    HttpModule,
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      isolate: true
    })
  ],
  providers: [
  ],
  entryComponents: [ExpAddDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

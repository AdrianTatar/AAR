import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FixedPricedProjectsComponent } from './fixed-priced-projects/fixed-priced-projects.component';
import { LogsComponent } from './logs/logs.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ButtonsComponent } from './shared/buttons/buttons.component';
import { SurchargeCustomersComponent } from './surcharge-customers/surcharge-customers.component';
import { routingComponents } from './routing.module';
import { RoutingModule } from './routing.module';
import { AddDialogComponent } from './shared/buttons/add-dialog/add-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialsModule } from './shared/materials.module';

// Ngx-Translate -Multilangual
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FixedPricedProjectsComponent,
    routingComponents,
    LogsComponent,
    NotFoundComponent,
    ButtonsComponent,
    SurchargeCustomersComponent,
    AppComponent,
    NavbarComponent,
    routingComponents,
    ButtonsComponent,
    AddDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialsModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddDialogComponent]
})
export class AppModule { }

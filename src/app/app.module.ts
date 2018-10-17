import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { routingComponents } from './routing.module';
import { RoutingModule } from './routing.module';
import { HttpModule} from '@angular/http';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    routingComponents,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RoutingModule,
    SharedModule,
    HttpModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogsComponent } from './logs/logs.component';
import { FixedPricedProjectsComponent } from './fixed-priced-projects/fixed-priced-projects.component';
import { SurchargeCustomersComponent } from './surcharge-customers/surcharge-customers.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ZahlerknotenComponent } from './zahlerknoten/zahlerknoten.component';
import { KundenstammComponent } from './kundenstamm/kundenstamm.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { page: 'one' } },
  { path: 'navbar', component: NavbarComponent },
  {
    path: 'fixed-prices',
    component: FixedPricedProjectsComponent,
    data: { page: 'two' }
  },
  {
    path: 'surcharge-customers',
    component: SurchargeCustomersComponent,
    data: { page: 'three' },
  },
  {
    path: 'zahlerknoten',
    component: ZahlerknotenComponent,
    data: { page: 'four' },
  },
  {
    path: 'kundenstamm',
    component: KundenstammComponent,
    data: { page: 'five' },
  },
  {
    path: 'logs',
    component: LogsComponent,
    data: { page: 'six' },
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule {}

export const routingComponents = [
  LoginComponent,
  FixedPricedProjectsComponent,
  SurchargeCustomersComponent,
  LogsComponent,
  NotFoundComponent,
  LoginComponent
];

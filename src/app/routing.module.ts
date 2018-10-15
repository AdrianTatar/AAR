import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { page: 'one' } },
  { path: 'fixed-prices', loadChildren: './pages/fixed-price-projects/fpp.module#FppModule', data: { page: 'two' }},
  { path: 'surcharge-customers', loadChildren: './pages/surcharge-customers/sc.module#ScModule', data: { page: 'thre' }},
  { path: 'payer-nodes', loadChildren: './pages/payer-nodes/pn.module#PnModule', data: { page: 'four' }},
  { path: 'customer-base', loadChildren: './pages/customer-base/customerbase.module#CustomerBaseModule', data: { page: 'five' }},
  { path: 'logs', loadChildren: './pages/logs/logs.module#LogsModule', data: { page: 'six' } },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutingModule { }

export const routingComponents = [
  LoginComponent,
  NotFoundComponent,
];

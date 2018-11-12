import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './shared/services/guards/auth-guard.service';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { noNavBar: 'true' } },
  {
    path: 'fixed-prices',
    loadChildren: './pages/fixed-price-projects/fpp.module#FppModule',
    data: { page: 'two' },
    canActivate: [AuthGuard]
  },
  {
    path: 'surcharge-customers',
    loadChildren: './pages/surcharge-customers/sc.module#ScModule',
    data: { page: 'three' },
    canActivate: [AuthGuard]
  },
  {
    path: 'payer-nodes',
    loadChildren: './pages/payer-nodes/pn.module#PnModule',
    data: { page: 'four' },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-base',
    loadChildren: './pages/customer-base/customerbase.module#CustomerBaseModule',
    data: { page: 'five' },
    canActivate: [AuthGuard]
  },
  {
    path: 'user-actions',
    loadChildren: './pages/user-actions/user-actions.module#UserActionsModule',
    data: { page: 'six' },
    canActivate: [AuthGuard]
  },
  {
    path: 'export',
    loadChildren: './pages/export/export.module#ExpModule',
    data: { page: 'seven'},
    canActivate: [AuthGuard]
  },
  { path: '**', component: NotFoundComponent, canActivate: [AuthGuard] }
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

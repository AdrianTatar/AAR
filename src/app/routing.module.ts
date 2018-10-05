import { LoginComponent } from './pages/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const appRoutes: Routes = [
  { path: '', component: LoginComponent, data: { page: 'one' } },
  { path: 'fixed-prices', loadChildren: './pages/fixed-priced-projects/fpp.module#FppModule', data: { page: 'two' }},
  { path: 'surcharge-customers', loadChildren: './pages/surcharge-customers/sc.module#ScModule', data: { page: 'thre' }},
  { path: 'zahlerknoten', loadChildren: './pages/zahlerknoten/zk.module#ZkModule', data: { page: 'four' }},
  { path: 'kundenstamm', loadChildren: './pages/kundenstamm/kundenstamm.module#KundenstammModule', data: { page: 'five' }},
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

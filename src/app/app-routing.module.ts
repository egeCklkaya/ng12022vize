import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guard/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { UyeComponent } from './components/uye/uye.component';
import { LoginComponent } from './components/login/login.component';
import { EvComponent } from './components/ev/ev.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent 
  },
  {
    path: 'login',
    component: LoginComponent 
  },
  {
    path: 'uye',
    component: UyeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ev',
    component: EvComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthCallbakComponent } from './components/auth-callbak/auth-callbak.component';

const routes: Routes = [
  {
    path: "", component: AuthComponent,
    children: [
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent }
    ]
  },
  {
    path: "", component: LayoutComponent,
    children: [
      { path: "passengers", component: PassengerComponent },
    ]
  },
  { path: 'auth/callback', component: AuthCallbakComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

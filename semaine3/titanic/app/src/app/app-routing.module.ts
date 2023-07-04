import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { LayoutComponent } from './components/layout/layout.component';
import { AuthComponent } from './components/auth/auth.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

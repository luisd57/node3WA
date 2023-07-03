import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PassengerComponent } from './components/passenger/passenger.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  { path: "", component: RegisterComponent },
  {
    path: "", component: LayoutComponent,
    children: [
      { path: "passengers", component: PassengerComponent },
    ]
  },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

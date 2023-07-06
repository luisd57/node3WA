import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CreateFurnitureComponent } from './components/create-furniture/create-furniture.component';
import { FurnitureListComponent } from './components/furniture-list/furniture-list.component';

const routes: Routes = [
  { path: "", component: AuthComponent },
  {
    path: "", component: LayoutComponent,
    children: [
      { path: "furniture/create", component: CreateFurnitureComponent },
      { path: "furniture/list", component: FurnitureListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

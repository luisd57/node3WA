import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { CreateFurnitureComponent } from './components/create-furniture/create-furniture.component';
import { FurnitureListComponent } from './components/furniture-list/furniture-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './components/layout/layout.component';
import { NgChartsModule } from 'ng2-charts';
import { MaterialChartComponent } from './components/material-chart/material-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AuthFormComponent,
    CreateFurnitureComponent,
    FurnitureListComponent,
    LayoutComponent,
    MaterialChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    NgChartsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}

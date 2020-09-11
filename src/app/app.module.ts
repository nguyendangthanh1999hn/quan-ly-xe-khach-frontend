import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LayoutComponent } from './layout/layout.component';
import {AuthGuard} from './auth.guard';
import {RevenueComponent} from './revenue/revenue.component';



const routes: Routes = [
  {
    path: '',
    component: LayoutComponent
  },
  {
    path: 'revenue',
    component: RevenueComponent
  },
  {
    path: 'buses',
    loadChildren: () => import('./buses/buses.module').then(m => m.BusesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'car',
    loadChildren: () => import('./car/car.module').then(m => m.CarModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trip',
    loadChildren: () => import('./trip/trip.module').then(m => m.TripModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    RevenueComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';



const routes: Routes = [
  {
    path: 'buses',
    loadChildren: () => import('./buses/buses.module').then(m => m.BusesModule)
  },
  {
    path: 'car',
    loadChildren: () => import('./car/car.module').then(m => m.CarModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: 'trip',
    loadChildren: () => import('./trip/trip.module').then(m => m.TripModule)
  }
];
@NgModule({
  declarations: [
    AppComponent,
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

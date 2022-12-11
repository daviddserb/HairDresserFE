import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegisterComponent } from './account/register/register.component';
import { LogInComponent } from './account/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminComponent } from './users/admin/admin.component';
import { EmployeeComponent } from './users/employee/employee.component';
import { CustomerComponent } from './users/customer/customer.component';
import { CreateAppointmentComponent } from './users-functionalities/appointments/create-appointment/create-appointment.component';
import { GetAllCustomerAppointmentsComponent } from './users-functionalities/appointments/get-all-customer-appointments/get-all-customer-appointments.component';
import { CreateHairServiceComponent } from './users-functionalities/hair-services/create-hair-service/create-hair-service.component';
import { GetAllHairServicesComponent } from './users-functionalities/hair-services/get-all-hair-services/get-all-hair-services.component';
import { UpdateHairServiceComponent } from './users-functionalities/hair-services/update-hair-service/update-hair-service.component';
import { GetAllAppointmentsComponent } from './users-functionalities/appointments/get-all-appointments/get-all-appointments.component';
import { GetAllEmployeesComponent } from './users-functionalities/employees/get-all-employees/get-all-employees.component';
import { AddHairServiceComponent } from './users-functionalities/hair-services/add-hair-service/add-hair-service.component';
import { GetEmployeeHairServicesComponent } from './users-functionalities/hair-services/get-employee-hair-services/get-employee-hair-services.component';
import { GetAllEmployeeAppointmentsComponent } from './users-functionalities/appointments/get-all-employee-appointments/get-all-employee-appointments.component';
import { GetAllEmployeeWorkingIntervalsComponent } from './users-functionalities/working-intervals/get-all-employee-working-intervals/get-all-employee-working-intervals.component';
import { CreateWorkingIntervalComponent } from './users-functionalities/working-intervals/create-working-interval/create-working-interval.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  // ! When add path here => go and add it in routingComponents too.
  
  {path: '', component: HomeComponent, children: [
    {path: 'register', component: RegisterComponent},
    {path: 'log-in', component: LogInComponent},
  ]},

  {path: 'profile', component: ProfileComponent},

  {path: 'admin', component: AdminComponent, children: [
    {path: 'hair-service', component: CreateHairServiceComponent},
    {path: 'hair-service/all', component: GetAllHairServicesComponent},
    {path: 'hair-service/update/:id', component: UpdateHairServiceComponent},
    {path: 'appointment/all', component: GetAllAppointmentsComponent},
    {path: 'employee/all', component: GetAllEmployeesComponent},
  ]},

  {path: 'employee', component: EmployeeComponent, children: [
    {path: 'hair-service', component: AddHairServiceComponent},
    {path: 'hair-service/all', component: GetEmployeeHairServicesComponent},
    {path: 'appointment/all', component: GetAllEmployeeAppointmentsComponent},
    {path: 'working-interval', component: CreateWorkingIntervalComponent},
    {path: 'working-interval/all', component: GetAllEmployeeWorkingIntervalsComponent},
  ]},

  {path: 'customer', component: CustomerComponent, children : [
    {path: 'appointment', component: CreateAppointmentComponent},
    {path: 'appointment/all', component: GetAllCustomerAppointmentsComponent},
  ]},
  
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
  ],
})
export class AppRoutingModule { }

export const routingComponents = [
  HomeComponent,
  RegisterComponent,
  LogInComponent,

  AdminComponent,
  CreateHairServiceComponent,
  GetAllHairServicesComponent,
  UpdateHairServiceComponent,
  GetAllAppointmentsComponent,
  GetAllEmployeesComponent,

  EmployeeComponent,
  AddHairServiceComponent,
  GetEmployeeHairServicesComponent,
  GetAllEmployeeAppointmentsComponent,
  CreateWorkingIntervalComponent,
  GetAllEmployeeWorkingIntervalsComponent,

  CustomerComponent,
  CreateAppointmentComponent,
  GetAllCustomerAppointmentsComponent,

  PageNotFoundComponent
]
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RegisterComponent } from './account/register/register.component';
import { LogInComponent } from './account/log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './users/admin/admin.component';
import { EmployeeComponent } from './users/employee/employee.component';
import { CustomerComponent } from './users/customer/customer.component';
import { CreateAppointmentComponent } from './users-functionalities/appointments/create-appointment/create-appointment.component';
import { ReadAllAppointmentsComponent } from './users-functionalities/appointments/read-all-appointments/read-all-appointments.component';
import { CreateHairServiceComponent } from './users-functionalities/hair-services/create-hair-service/create-hair-service.component';
import { ReadAllHairServicesComponent } from './users-functionalities/hair-services/read-all-hair-services/read-all-hair-services.component';
import { UpdateComponent } from './users-functionalities/hair-services/update/update.component';

const routes: Routes = [
  //! After adding the path, add it in routingComponents.
  {path: '', component: HomeComponent},
  
  {path: 'register', component: RegisterComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'profile', component: ProfileComponent},

  {path: 'admin', component: AdminComponent, children: [
    {path: 'hair-service', component: CreateHairServiceComponent},
    {path: 'hair-service/all', component: ReadAllHairServicesComponent},
    {path: 'hair-service/update/:id', component: UpdateComponent}
  ]},

  {path: 'employee', component: EmployeeComponent},

  {path: 'customer', component: CustomerComponent, children : [
    {path: 'appointment', component: CreateAppointmentComponent},
    {path: 'appointment/all', component: ReadAllAppointmentsComponent},
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
  ProfileComponent,

  AdminComponent,
  CreateHairServiceComponent,
  ReadAllHairServicesComponent,
  UpdateComponent,

  EmployeeComponent,

  CustomerComponent,
  CreateAppointmentComponent,
  ReadAllAppointmentsComponent,

  PageNotFoundComponent
]
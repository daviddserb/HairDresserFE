
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { NoWhitespaceAllowedDirective } from './directives/no-whitespace-allowed.directive';

import { NotifierComponent } from './notifier/notifier.component';

import { InterceptorService } from './loader/interceptor.service';
import { LoadingSpinnerComponent } from './loader/loading-spinner/loading-spinner.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule} from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { GetInWorkEmployeeAppointmentsComponent } from './users-functionalities/appointments/get-in-work-employee-appointments/get-in-work-employee-appointments.component';

import { DatePipe } from '@angular/common';
import { GetInWorkCustomerAppointmentsComponent } from './users-functionalities/appointments/get-in-work-customer-appointments/get-in-work-customer-appointments.component';


const MaterialComponents = [
  MatSnackBarModule,
  MatTableModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTooltipModule,
  MatStepperModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatPaginatorModule,
  MatSortModule,
  MatMenuModule
]

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    NoWhitespaceAllowedDirective,
    NotifierComponent,
    LoadingSpinnerComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    GetInWorkEmployeeAppointmentsComponent,
    GetInWorkCustomerAppointmentsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialComponents
  ],
  providers: [
    HttpClientModule,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

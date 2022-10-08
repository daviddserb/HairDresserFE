import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import * as moment from 'moment';
import { filter } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-get-all-customer-appointments',
  templateUrl: './get-all-customer-appointments.component.html',
  styleUrls: ['./get-all-customer-appointments.component.css']
})
export class GetAllCustomerAppointmentsComponent implements OnInit {
  customerId!: number;

  allAppointmentsByCustomerId$!: any;

  displayedColumns: string[] = ['id', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price', 'actions'];

  filteredCustomerAppointment!: any;
  
  constructor(public hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  getAppointmentsByCustomerId() {
    console.log("getAppointmentsByCustomerId():");

    console.log("customerId");
    console.log(this.customerId);

    this.allAppointmentsByCustomerId$ = this.hairdresserService.getAllAppointmentsByCustomerId(this.customerId)
    .pipe(
      map(customerAppointments => {
        console.log("customerAppointments=", customerAppointments);

        this.filteredCustomerAppointment = customerAppointments.filter(customerAppointment => customerAppointment.isDeleted === null);
        console.log("customerAppointments filtered=", this.filteredCustomerAppointment);

        return this.filteredCustomerAppointment;
      })
    );
  }

  isAppointmentInWork(appointmentStartDate: Date) {
    //console.log("isAppointmentInWork():");

    //console.log("appointmentStartDate=", appointmentStartDate);

    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    /* Cancel only if the current date + 1 date (1 day) < appointment start date. Example:
    current date: 3/10/2022 10:00:00
    appointment start date 1: 4/10/2022 07:00:00 => CAN'T CANCEL
    appointment start date 1: 4/10/2022 10:30:00 => CAN CANCEL
    */
    if (moment(appointmentStartDate).isAfter(currentDate)) return true;

    return false;
  }

  deleteAppointmentInWork(appointmentId: number) {
    console.log("deleteAppointmentInWork():");

    console.log("appointmentId= ", appointmentId)

    this.hairdresserService.deleteAppointmentById(appointmentId).subscribe();
  }

}

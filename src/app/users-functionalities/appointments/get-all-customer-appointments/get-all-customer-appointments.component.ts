import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';

@Component({
  selector: 'app-get-all-customer-appointments',
  templateUrl: './get-all-customer-appointments.component.html',
  styleUrls: ['./get-all-customer-appointments.component.css']
})
export class GetAllCustomerAppointmentsComponent implements OnInit {
  customerId!: number;

  allCustomerAppointmentsNotCanceled$!: any;

  displayedColumns: string[] = ['id', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price', 'actions'];

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
  }

  getAppointmentsByCustomerId() {
    this.allCustomerAppointmentsNotCanceled$ = this.hairdresserService.getAllAppointmentsByCustomerId(this.customerId)
    .pipe(
      map(customerAppointments => {
        console.log("customer appointments=", customerAppointments);
        let customerAppointmentsNotCanceled = customerAppointments.filter(customerAppointment => customerAppointment.isDeleted === null);
        console.log("customer appointments not canceld=", customerAppointmentsNotCanceled);
        return customerAppointmentsNotCanceled;
      })
    )
    // ???
    // .subscribe({
    //   next: (v) => console.log(v),
    //   error: (e) => this.popUpMessagesService.showPopUpMessage("Customer id doesn't exists!", "OK", "error"),
    // });
  }

  checkIfAppointmentIsInWork(appointmentStartDate: Date) {
    let currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    /*
    Cancel only if: current date + 1 day < appointment start date.
    Example:
    current date: 3/10/2022 10:00:00
    appointment start date 1: 4/10/2022 07:00:00 => CAN'T CANCEL
    appointment start date 2: 4/10/2022 10:30:00 => CAN CANCEL
    */
    if (moment(appointmentStartDate).isAfter(currentDate)) return true;
    return false;
  }

  cancelAppointmentInWork(appointmentId: number) {
    this.hairdresserService.deleteAppointmentById(appointmentId)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to cancel appointment!", "OK", "error"),
      complete: () => this.popUpMessagesService.showPopUpMessage("Appointments successfully canceled!", "OK", "success"),
    });
  }
}
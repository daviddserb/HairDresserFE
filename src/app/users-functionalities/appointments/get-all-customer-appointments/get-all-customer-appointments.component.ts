import { Component, Input, OnInit } from '@angular/core';
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
  // All the customers appointments (that are NOT canceled)
  allCustomerAppointments$!: any;

  displayedColumns: string[] = ['#', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price', 'actions'];

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
    ) {}

  ngOnInit(): void {
    this.getAllCustomerAppointments();
  }

  getAllCustomerAppointments() {
    let customerId = String(localStorage.getItem('id'));

    this.allCustomerAppointments$ = this.hairdresserService.getAllAppointmentsByCustomerId(customerId)
    .pipe(
      map(customerAppointments => {
        console.log("customer appointments=", customerAppointments);
        let customerAppointmentsNotCanceled = customerAppointments.filter(customerAppointment => customerAppointment.isDeleted === null);
        console.log("customer appointments not canceld=", customerAppointmentsNotCanceled);
        return customerAppointmentsNotCanceled;
      })
    );
    // EROARE ??? (Understanding RxJS map, mergeMap, switchMap and concatMap -> probabil ii pt. ca am un observable de observable din cauza lui map)
    // .subscribe({
    //   next: (res) => console.log("next, res = ", res),
    //   error: (e) => this.popUpMessagesService.showPopUpMessage(e.error, "OK", "error"),
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

  cancelInWorkAppointment(appointmentId: number) {
    this.hairdresserService.deleteAppointmentById(appointmentId)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to cancel appointment!", "OK", "error"),
      complete: () => this.popUpMessagesService.showPopUpMessage("Appointments successfully canceled!", "OK", "success"),
    });
  }
}
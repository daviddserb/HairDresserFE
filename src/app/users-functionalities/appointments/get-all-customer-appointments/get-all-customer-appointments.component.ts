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
    allCustomerAppointments$!: any;
    displayedColumns: string[] = ['#', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price', 'actions'];

    constructor(
        private hairdresserService: HairDresserService,
        private popUpMessagesService: PopUpMessagesService) {}

    ngOnInit(): void {
        this.getAllCustomerAppointments();
    }

    getAllCustomerAppointments() {
        let customerId = String(localStorage.getItem('id'));

        this.allCustomerAppointments$ = this.hairdresserService.getAllAppointmentsByCustomerId(customerId)
        .pipe(
            map(customerAppointments => {
                let customerAppointmentsNotCanceled = customerAppointments.filter(customerAppointment => customerAppointment.isDeleted === null);
                return customerAppointmentsNotCanceled;
            })
        );

        //??? EROARE: Understanding RxJS map, mergeMap, switchMap and concatMap -> probabil ii pt. ca am un observable de observable din cauza lui map
        // .subscribe({
        //   next: (res) => 
        //   error: (e) => this.popUpMessagesService.showPopUpMessage(e.error, "OK", "error"),
        // });
    }

    checkIfAppointmentIsInWork(appointmentStartDate: Date) {
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        if (moment(appointmentStartDate).isAfter(currentDate)) return true;
        return false;
    }

    cancelInWorkAppointment(appointmentId: number) {
        this.hairdresserService.deleteAppointmentById(appointmentId)
        .subscribe({
            error: (error) => this.popUpMessagesService.showPopUpMessage("Failed to cancel appointment!", "OK", "error"),
            complete: () => this.popUpMessagesService.showPopUpMessage("Appointments successfully canceled!", "OK", "success"),
        });
    }
}
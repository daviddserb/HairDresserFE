import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-finished-customer-appointments',
  templateUrl: './get-finished-customer-appointments.component.html',
  styleUrls: ['./get-finished-customer-appointments.component.css']
})
export class GetFinishedCustomerAppointmentsComponent implements OnInit {
  customerAppointmentsFinished$: any;
  displayedColumns: string[] = ['#', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price', 'review'];
  totalRatingStars: number = 5;

  constructor
  (
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
  ) { }

  ngOnInit(): void {
    let customerId = String(localStorage.getItem('id'));

    this.hairdresserService.getFinishedAppointmentsByCustomerId(customerId)
    .subscribe({
      next: (res) =>  {
        console.log("res= ", res);
        this.customerAppointmentsFinished$ = res;
      },
      error: (e) => {
        console.log("e= ", e);
        if (typeof e.error == "object") {
          this.popUpMessagesService.showPopUpMessage(e.message, "OK", "error");
        } else {
          this.popUpMessagesService.showPopUpMessage(e.error, "OK", "error");
        }
      },
    });
  }

}

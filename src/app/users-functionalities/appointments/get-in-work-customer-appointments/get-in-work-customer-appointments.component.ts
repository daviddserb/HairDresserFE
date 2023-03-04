import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-get-in-work-customer-appointments',
  templateUrl: './get-in-work-customer-appointments.component.html',
  styleUrls: ['./get-in-work-customer-appointments.component.css']
})
export class GetInWorkCustomerAppointmentsComponent implements OnInit {
  customerAppointmentsInWork$: any;
  displayedColumns: string[] = ['#', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price'];
  currentDate: any; // ??? string
  
  constructor
  (
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
    private datePipe: DatePipe
  )
  { 
    this.currentDate = this.datePipe.transform(new Date(), 'dd/MM/yyyy');
    console.log("today= ", this.currentDate);
  }

  ngOnInit(): void {
    let customerId = String(localStorage.getItem('id'));

    this.hairdresserService.getInWorkAppointmentsByCustomerId(customerId)
    .subscribe({
      next: (res) =>  {
        console.log("res= ", res);
        this.customerAppointmentsInWork$ = res;
      },
      error: (e) => {
        console.log("e= ", e);
        
        if (typeof e.error == "object") {
          this.popUpMessagesService.showPopUpMessage(e.error.Message, "OK", "error");
        } else {
          this.popUpMessagesService.showPopUpMessage(e.error, "OK", "error");
        }
      },
    });
  }

  checkIfStartDateIsToday(appointmentStartDate: Date): string {
    console.log("appointmentStartDate= ", appointmentStartDate);
    const appointmentStartDateFormatted = this.datePipe.transform(appointmentStartDate, 'dd/MM/yyyy');
    console.log("appointmentStartDateFormatted= ", appointmentStartDateFormatted);
    if (appointmentStartDateFormatted === this.currentDate) return 'green-text';
    return '';
  }

}

import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-finished-employee-appointments',
  templateUrl: './get-finished-employee-appointments.component.html',
  styleUrls: ['./get-finished-employee-appointments.component.css']
})
export class GetFinishedEmployeeAppointmentsComponent implements OnInit {
  employeeAppointmentsFinished$: any;
  displayedColumns: string[] = ['#', 'employeeName', 'startDate', 'endDate', 'hairServices', 'price']; // !!! To add 'review'

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
  ) { }

  ngOnInit(): void {
    let employeeId = String(localStorage.getItem('id'));
    this.hairdresserService.getFinishedAppointmentsByEmployeeId(employeeId)
    .subscribe({
      next: (res) =>  {
        console.log("res= ", res);
        this.employeeAppointmentsFinished$ = res;
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
}

import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employee-appointments',
  templateUrl: './get-all-employee-appointments.component.html',
  styleUrls: ['./get-all-employee-appointments.component.css']
})
export class GetAllEmployeeAppointmentsComponent implements OnInit {
  allEmployeeAppointments$: any;
  displayedColumns: string[] = ['#', 'customerName', 'startDate', 'endDate', 'hairServices', 'price'];

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
    this.getAllEmployeeAppointments();
  }

  getAllEmployeeAppointments() {
    let employeeId = String(localStorage.getItem('id'));
    this.hairdresserService.getAllAppointmentsByEmployeeId(employeeId)
    .subscribe({
      next: (res) =>  {
        console.log("next, res= ", res);
        this.allEmployeeAppointments$ = res;
      },
      error: (e) => {
        console.log("error, e= ", e);
        
        if (typeof e.error == "object") {
          this.popUpMessagesService.showPopUpMessage(e.error.Message, "OK", "error");
        } else {
          this.popUpMessagesService.showPopUpMessage(e.error, "OK", "error");
        }
      },
    });
  }

}

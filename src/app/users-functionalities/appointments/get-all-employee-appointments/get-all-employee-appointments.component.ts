import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employee-appointments',
  templateUrl: './get-all-employee-appointments.component.html',
  styleUrls: ['./get-all-employee-appointments.component.css']
})
export class GetAllEmployeeAppointmentsComponent implements OnInit {
  employeeId!: number;
  allEmployeeAppointments$: any;
  displayedColumns: string[] = ['id', 'customerName', 'startDate', 'endDate', 'hairServices', 'price'];

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
  }

  getAppointmentsByEmployeeId() {
    this.hairdresserService.getAllAppointmentsByEmployeeId(this.employeeId)
    .subscribe({
      next: (res) =>  this.allEmployeeAppointments$ = res,
      error: (e) => this.popUpMessagesService.showPopUpMessage("Employee id doesn't exist!", "OK", "error"),
    });
  }

}

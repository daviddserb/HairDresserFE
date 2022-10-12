import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employee-appointments',
  templateUrl: './get-all-employee-appointments.component.html',
  styleUrls: ['./get-all-employee-appointments.component.css']
})
export class GetAllEmployeeAppointmentsComponent implements OnInit {
  employeeId!: number;
  allEmployeeAppointments$: any;
  displayedColumns: string[] = ['id', 'customerName', 'startDate', 'endDate', 'hairServices', 'price', 'actions'];

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  getAppointmentsByEmployeeId() {
    console.log("getAppointmentsByEmployeeId()");
    
    console.log("employee id =", this.employeeId);

    this.hairdresserService.getAllAppointmentsByEmployeeId(this.employeeId).subscribe(res => this.allEmployeeAppointments$ = res);
  }

}

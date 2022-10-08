import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-appointments',
  templateUrl: './get-all-appointments.component.html',
  styleUrls: ['./get-all-appointments.component.css']
})
export class GetAllAppointmentsComponent implements OnInit {
  allAppointments$!: any;

  displayedColumns: string[] = ['id', 'employeeId', 'customerId','startDate', 'endDate', 'hairServices', 'price', 'canceled'];

  constructor(public hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    // !!!??? hardcoded just for testing - pageNumber: number, pageSize: number
    //this.allAppointments$ = this.hairdresserService.getAllAppointments(1, 100).subscribe(res => console.log(res));

    this.hairdresserService.getAllAppointments(1, 100).subscribe(res => {
      console.log("res= ", res);
      this.allAppointments$ = res
    });
  }

}

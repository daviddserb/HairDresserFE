import { Component, OnInit, ViewChild } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-get-all-appointments',
  templateUrl: './get-all-appointments.component.html',
  styleUrls: ['./get-all-appointments.component.css']
})
export class GetAllAppointmentsComponent implements OnInit {
  allAppointments$!: any;

  displayedColumns: string[] = ['count', 'id', 'employeeId', 'customerId','startDate', 'endDate', 'hairServices', 'price', 'canceled'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    // !!!??? hardcoded just for testing - pageNumber: number, pageSize: number
    //this.allAppointments$ = this.hairdresserService.getAllAppointments(1, 100).subscribe(res => console.log(res));
    
    console.log("ngOnInit()");
    this.hairdresserService.getAllAppointments(1, 1000).subscribe(res => {
      console.log("res= ", res);
      this.allAppointments$ = res

      this.allAppointments$.paginator = this.paginator;
    });
    //this.allAppointments$.paginator = this.paginator; // Cannot set properties of undefined (setting 'paginator').
  }

}

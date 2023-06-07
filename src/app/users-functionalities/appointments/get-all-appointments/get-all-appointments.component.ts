import { Component, OnInit, ViewChild } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-get-all-appointments',
  templateUrl: './get-all-appointments.component.html',
  styleUrls: ['./get-all-appointments.component.css']
})
export class GetAllAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['#', 'employeeName', 'customerName','startDate', 'endDate', 'hairServices', 'price', 'review', 'canceled'];
  totalRatingStars: number = 5;

  allAppointments$: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    //??? hardcoded pageNumber and pageSize in getAllAppointments
    this.hairdresserService.getAllAppointments(1, 1000)
    .subscribe(res => {
      console.log("all appointments= ", res);
      this.allAppointments$ = new MatTableDataSource(res);
      this.allAppointments$.paginator = this.paginator;
      this.allAppointments$.sort = this.sort;
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-get-all-appointments',
  templateUrl: './get-all-appointments.component.html',
  styleUrls: ['./get-all-appointments.component.css']
})
export class GetAllAppointmentsComponent implements OnInit {
  displayedColumns: string[] = ['count', 'id', 'employeeId', 'customerId','startDate', 'endDate', 'hairServices', 'price', 'canceled'];

  dataSource: any;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    // ? hardcoded pageNumber and pageSize.  
    this.hairdresserService.getAllAppointments(1, 1000)
    .subscribe(res => {
      console.log("res= ", res);
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
    });
  }
}

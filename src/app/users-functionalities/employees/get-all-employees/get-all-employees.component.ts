import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, tap } from 'rxjs';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employees',
  templateUrl: './get-all-employees.component.html',
  styleUrls: ['./get-all-employees.component.css']
})
export class GetAllEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['count', 'employeeId', 'employeeName', 'employeeHairServices', 'employeeWorkingIntervals'];
  
  allEmployees$: any;
  allEmployeesWorkingIntervals$: any;

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    this.hairdresserService.getAllEmployees().subscribe(res => {
      console.log("all employees= ", res);
      this.allEmployees$ = res;
    });

    //Sorting by working day id, so it will be by the order of the weekly days.
    this.hairdresserService.getAllWorkingIntervals().pipe(
      map(result => {
        result.sort(this.sortByDay);
        this.allEmployeesWorkingIntervals$ = result;
        console.log("sorted employees working intervals= ", this.allEmployeesWorkingIntervals$);
      })
    ).subscribe();
  }

  sortByDay = (a: any, b: any) => {
    return (a.workingDay.id < b.workingDay.id) ? -1 : (a.workingDay.id > b.workingDay.id) ? 1 : 0;
  }

}

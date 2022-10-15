import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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

    this.hairdresserService.getAllWorkingIntervals().subscribe(res => {
      console.log("all working intervals= ", res);
      this.allEmployeesWorkingIntervals$ = res;
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employee-working-intervals',
  templateUrl: './get-all-employee-working-intervals.component.html',
  styleUrls: ['./get-all-employee-working-intervals.component.css']
})
export class GetAllEmployeeWorkingIntervalsComponent implements OnInit {
  employeeId!: number; //??? nu cred ca mai trb.
  employeeWorkingIntervals$: any;

  displayedColumns: string[] = ['id', 'workingDay', 'startTime', 'endTime', 'actions'];

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  getWorkingIntervals(employeeId: number) {
    this.hairdresserService.getAllEmployeeWorkingIntervalsByEmployeeId(employeeId).subscribe(res => this.employeeWorkingIntervals$ = res);
  }

  deleteWorkingInterval(workingIntervalId: number) {
    console.log("working interval id =", workingIntervalId);
    
    this.hairdresserService.deleteWorkingIntervalById(workingIntervalId).subscribe();
  }

}

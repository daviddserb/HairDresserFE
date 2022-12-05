import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employees',
  templateUrl: './get-all-employees.component.html',
  styleUrls: ['./get-all-employees.component.css']
})
export class GetAllEmployeesComponent implements OnInit {
  displayedColumns: string[] = ['#', 'employeeName', 'employeeHairServices', 'employeeWorkingIntervals'];
  
  allEmployees$: any;

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    this.hairdresserService.getAllEmployees().subscribe(res => {
      console.log("all employees= ", res);
      this.allEmployees$ = res;
    });
  }
}

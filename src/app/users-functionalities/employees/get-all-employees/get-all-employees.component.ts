import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { WorkingDay } from 'src/app/models/WorkingDay';

@Component({
    selector: 'app-get-all-employees',
    templateUrl: './get-all-employees.component.html',
    styleUrls: ['./get-all-employees.component.css']
})
export class GetAllEmployeesComponent implements OnInit {
    displayedColumns: string[] = ['#', 'employeeName', 'employeeHairServices', 'employeeWorkingIntervals'];
    allEmployees$: any;
    WorkingDay = WorkingDay;

    constructor(private hairdresserService: HairDresserService) {}

    ngOnInit(): void {
        this.hairdresserService.getAllEmployees()
        .subscribe(res => {
            this.allEmployees$ = res;
        });
    }
}
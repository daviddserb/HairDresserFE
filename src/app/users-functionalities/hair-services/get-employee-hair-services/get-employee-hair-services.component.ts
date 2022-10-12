import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-employee-hair-services',
  templateUrl: './get-employee-hair-services.component.html',
  styleUrls: ['./get-employee-hair-services.component.css']
})
export class GetEmployeeHairServicesComponent implements OnInit {
  employeeId!: number;

  employeeHairServices$: any;

  displayedColumns: string[] = ['name', 'duration', 'price', 'actions'];

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  getHairServicesByEmployeeId() {
    console.log("getHairServicesByEmployeeId():");

    this.hairdresserService.getHairServicesByEmployeeId(this.employeeId).subscribe(res => {
      this.employeeHairServices$ = res
      console.log("employee hair services =", this.employeeHairServices$);
    });
  }

  deleteHairService(employeeHairServiceId: number) {
    console.log("deleteHairService():");

    console.log("id= ", employeeHairServiceId);

    this.hairdresserService.deleteHairServiceFromEmployee(employeeHairServiceId).subscribe();
  }
}

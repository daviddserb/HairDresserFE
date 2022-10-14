import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
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

  constructor(private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
  }

  getHairServicesByEmployeeId() {
    this.hairdresserService.getHairServicesByEmployeeId(this.employeeId)
    .subscribe({
      next: (res) =>  {
        this.employeeHairServices$ = res;

        if (Object.keys(res).length === 0) this.popUpMessagesService.showPopUpMessage("Employee id doesn't exist!", "OK", "error");
      }
    });
  }

  deleteHairService(employeeHairServiceId: number) {
    this.hairdresserService.deleteHairServiceFromEmployee(employeeHairServiceId).subscribe();
  }
}

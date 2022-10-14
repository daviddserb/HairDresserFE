import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-add-hair-service',
  templateUrl: './add-hair-service.component.html',
  styleUrls: ['./add-hair-service.component.css']
})
export class AddHairServiceComponent implements OnInit {
  employeeId!: number; //??? nu cred ca mai trb.

  missingHairServices$!: any;
  displayedColumns: string[] = ['checkBox', 'id', 'name', 'duration', 'price'];

  // SelectionModel has 2 parameters (bolean for multiple selection, initial value).
  selection = new SelectionModel<any>(true, []);
  
  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,) {}

  ngOnInit(): void {
  }

  getMissingHairServices(employeeId: number) {
    this.hairdresserService.getMissingHairServicesByEmployeeId(employeeId)
    .subscribe
    ({
      next: (res) =>  {
        this.missingHairServices$ = res;
        if (Object.keys(res).length === 0) this.popUpMessagesService.showPopUpMessage("You have all the hair services!", "OK", "success");
      }
    });
  }

  saveHairServicesForEmployee() {
    console.log("saveHairServicesForEmployee()");
    console.log("employee id = ", this.employeeId);

    console.log("selected hair services= ", this.selection.selected);
    let hairServicesIds = this.selection.selected.map(hairServices => hairServices.id);
    console.log("selected hair services ids= ", hairServicesIds)

    let employeeHairService = {
      employeeId: this.employeeId,
      hairServicesIds: hairServicesIds
    };

    this.hairdresserService.addHairServicesToEmployee(employeeHairService).subscribe();
  }

}

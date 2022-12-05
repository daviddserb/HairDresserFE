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
  employeeId = String(localStorage.getItem('id'));

  missingHairServices$!: any;
  displayedColumns: string[] = ['checkBox', '#', 'name', 'duration', 'price'];

  // SelectionModel has 2 parameters (bolean for multiple selection, initial value).
  selection = new SelectionModel<any>(true, []);
  
  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
    ) {}

  ngOnInit(): void {
    this.getMissingHairServices();
  }

  // getInputValue(inputValue: string) {
  //   // Convert inputValue from string to number with the '+' sign.
  //   this.employeeId = +inputValue;
  //   this.getMissingHairServices(inputValue);
  // }

  getMissingHairServices() {
    this.hairdresserService.getMissingHairServicesByEmployeeId(this.employeeId)
    .subscribe
    ({
      next: (res) =>  {
        if (Object.keys(res).length === 0) this.popUpMessagesService.showPopUpMessage("The employee is qualified in all the hair services!", "OK", "success");
        this.missingHairServices$ = res;
      },
      error: (e) => this.popUpMessagesService.showPopUpMessage(e.error.Message, "OK", "error"),
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

    this.hairdresserService.addHairServicesToEmployee(employeeHairService)
    .subscribe({
      next: (res) =>  {
        console.log("next, res= ", res);
        this.popUpMessagesService.showPopUpMessage("Successfully added the selected hair services!", "OK", "success");
      },
      error: (e) => this.popUpMessagesService.showPopUpMessage("Error!", "OK", "error"),
    });
  }

}

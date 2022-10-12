import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
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
  
  constructor(private hairdresserService: HairDresserService) {}

  ngOnInit(): void {
  }

  getMissingHairServices(employeeId: number) {
    console.log("getMissingHairServices():");

    console.log("employeeId = ", employeeId);

    this.hairdresserService.getMissingHairServicesByEmployeeId(employeeId)
    .subscribe(res => this.missingHairServices$ = res);
  }

  getSelectedHairServices() {
    console.log("getSelectedHairServices()");

    //console.log("employee id = ", this.employeeId);

    //this.selection.selected.map(hairServices => hairServices.id)
    console.log("selected hair services =", this.selection.selected);
  }

}

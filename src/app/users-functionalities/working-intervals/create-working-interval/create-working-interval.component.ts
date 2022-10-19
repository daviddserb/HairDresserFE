import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-create-working-interval',
  templateUrl: './create-working-interval.component.html',
  styleUrls: ['./create-working-interval.component.css']
})
export class CreateWorkingIntervalComponent implements OnInit {
  formWorkingInterval = new FormGroup({
    workingDayId: new FormControl('', Validators.required),
    employeeId: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  allEmployees$: any;

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
    this.hairdresserService.getAllEmployees().subscribe(res => this.allEmployees$ = res);
  }

  get formGetter() { return this.formWorkingInterval.controls; }

  createWorkingInterval() {
    console.log("form= ", this.formWorkingInterval.value);

    let infoWorkingInterval = this.formWorkingInterval.value;

    this.hairdresserService.postWorkingInterval(infoWorkingInterval)
    .subscribe({
      error: (e) => this.popUpMessagesService.showPopUpMessage("Interval overlaping with the existing ones or the pause between the intervals is not 1 hour at least!", "OK", "error"),
      complete: () => this.popUpMessagesService.showPopUpMessage("Interval successfully created!", "OK", "success")
    });
  }
}

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
    workingDayId: new FormControl(''),
    employeeId: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  selectedDay!: string;

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
  }

  get formGetter() { return this.formWorkingInterval.controls; }

  createWorkingInterval() {
    console.log("createWorkingInterval():");

    console.log("selected day id= ", this.selectedDay)

    let infoWorkingInterval = this.formWorkingInterval.value;
    infoWorkingInterval.workingDayId = this.selectedDay;
    this.hairdresserService.postWorkingInterval(infoWorkingInterval)
    .subscribe({
      next: (res) => {
        this.popUpMessagesService.showPopUpMessage("Interval successfully created!", "OK", "success");
        console.log("next res=", res);
      },
      error: (e) => this.popUpMessagesService.showPopUpMessage("Interval overlaping with the existing ones!", "OK", "error"),
      complete: () => console.log("complete")
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  get formGetter() { return this.formWorkingInterval.controls; }

  createWorkingInterval() {
    console.log("createWorkingInterval():");

    let infoWorkingInterval = this.formWorkingInterval.value;
    this.hairdresserService.postWorkingInterval(infoWorkingInterval).subscribe();
  }
}

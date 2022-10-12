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
    employeeId: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  selectedDay!: string;

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  get formGetter() { return this.formWorkingInterval.controls; }

  createWorkingInterval() {
    console.log("createWorkingInterval():");

    console.log("selected day id= ", this.selectedDay)

    let infoWorkingInterval = this.formWorkingInterval.value;
    this.hairdresserService.postWorkingInterval(infoWorkingInterval).subscribe();
  }
}

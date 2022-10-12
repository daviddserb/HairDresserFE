import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { HairDresserService } from 'src/app/services/hairdresser.service';
import { Appointment } from 'src/app/models/Appointment';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  isLinear = true;
  firstFormGroup = this._formBuilder.group({
    firstCtrl: [Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  
  allHairServices$!: any;
  displayedColumns: string[] = ['checkBox', 'id', 'name', 'duration', 'price'];

  // SelectionModel has 2 parameters (bolean for multiple selection, initial value).
  selection = new SelectionModel<any>(true, []);

  employeesByHairServices!: any;
  appointmentDuration: any;
  appointmentPrice: any;

  selectedEmployeeId!: any;

  currentDate = new Date();
  selectedDate!: any;
  
  weekendFilter = (d: Date | any): boolean => {
    console.log("weekendFilter:");
    console.log("d= ", d);
    const day = d.getDay();
    // Prevents Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  }

  customerId!: any;

  validIntervals: any;

  constructor(
    public hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
    private router: Router,
    private _formBuilder: FormBuilder
    ) {}

  ngOnInit(): void {
    this.allHairServices$ = this.hairdresserService.getAllHairServices();
  }

  getDataBySelectedHairServices() {
    console.log("getDataBySelectedHairServices()");

    console.log("selected hair services= ", this.selection.selected);
    console.log("selected hair services ids= ", this.selection.selected.map(hairServices => hairServices.id));

    this.getEmployeesForAppointment();
    this.getDurationForAppointment();
    this.getPriceForAppointment();
  }

  getEmployeesForAppointment() {
    console.log("-> getEmployeesForAppointment");
    
    this.hairdresserService.getEmployeesByHairServicesIds(this.selection.selected.map(hairServices => hairServices.id))
    .subscribe({
      next: (result) => this.employeesByHairServices = result,
      error: (e) => this.popUpMessagesService.showPopUpMessage("No employee for the selected hair services!", "OK", "error"),
    });
  }

  getDurationForAppointment() {
    this.hairdresserService.getDurationByHairServicesIds(this.selection.selected.map(hairServices => hairServices.id))
    .subscribe(result => this.appointmentDuration = result);
  }

  getPriceForAppointment() {
    this.hairdresserService.getPriceByHairServicesIds(this.selection.selected.map(hairServices => hairServices.id))
    .subscribe(result => this.appointmentPrice = result);
  }

  saveEmployeeId(employeeId: number) {
    console.log("saveEmployeeId():");

    this.selectedEmployeeId = employeeId;
    console.log("selected employee id= ", this.selectedEmployeeId);

    this.popUpMessagesService.showPopUpMessage("Employee saved", "OK", "success");
  }

  getSelectedDate(date: any) {
    console.log("getSelectedDate():");
    console.log(date.value);

    this.selectedDate = date.value;
    console.log(this.selectedDate.getFullYear()); // nr. an
    console.log(this.selectedDate.getMonth()); // nr. lunii dar numaratoarea incepe de la 0.
    console.log(this.selectedDate.getDay()); // nr. zilei a saptamanii.
    console.log(this.selectedDate.getDate()); // nr. zilei a lunii.
  }

  onSubmit() {
    console.log(this.customerId);
    return this.customerId;
  }

  getValidIntervalsForAppointment() {
    console.log("getValidIntervalsForAppointment()")

    this.hairdresserService.getValidIntervals(this.selectedEmployeeId, this.selectedDate, this.appointmentDuration, this.customerId)
    .subscribe({
      next: (res) => {
        console.log("next - valid intervals (res)= ", res);
        this.validIntervals = res;
      },
      error: (e) => this.popUpMessagesService.showPopUpMessage("The employee has no working intervals in this day", "OK", "error"),
    });
  }

  CreateAppointment(interval: any) {
    console.log("CreateAppointment()");
    
    console.log("interval= ", interval);

    type ObjectKey = keyof typeof interval;
    const startDateProp = 'startDate' as ObjectKey;
    const endDateProp = 'endDate' as ObjectKey;
    console.log("start date= ", interval[startDateProp]);
    console.log("end date= ", interval[endDateProp]);

    let appointment: Appointment = {
      customerId: this.customerId,
      employeeId: this.selectedEmployeeId,
      hairServicesIds: this.selection.selected.map(hairService => hairService.id),
      startDate: interval[startDateProp],
      endDate: interval[endDateProp],
      price: this.appointmentPrice
    }
    console.log("appointment= ", appointment);

    this.hairdresserService.postAppointment(appointment)
    .subscribe(res => {
      this.popUpMessagesService.showPopUpMessage("Appointment successfully created!", "OK", "success");
      this.router.navigate(['customer/appointment/all']);
    });
  }
}
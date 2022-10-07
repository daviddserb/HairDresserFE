import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { switchMap} from 'rxjs';
import { Appointment } from 'src/app/models/Appointment';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
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

  constructor(public hairdresserService: HairDresserService) {}

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
    this.hairdresserService.getEmployeesByHairServicesIds(this.selection.selected.map(hairServices => hairServices.id))
    .subscribe(result => this.employeesByHairServices = result);
  }

  getDurationForAppointment() {
    this.hairdresserService.getDurationByHairServicesIds(this.selection.selected.map(hairServices => hairServices.id))
    .subscribe(result => this.appointmentDuration = result);
  }

  getPriceForAppointment() {
    this.hairdresserService.getPriceByHairServicesIds(this.selection.selected.map(hairServices => hairServices.id))
    .subscribe(result => this.appointmentPrice = result);
  }

  saveEmployeeID(employeeId: number) {
    console.log("saveEmployeeID():");

    this.selectedEmployeeId = employeeId;
    console.log("selected employee id= ", this.selectedEmployeeId);
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
    .subscribe(res => this.validIntervals = res);
  }

  // Create Appointment
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

    this.hairdresserService.postAppointment(appointment).subscribe();
  }
}
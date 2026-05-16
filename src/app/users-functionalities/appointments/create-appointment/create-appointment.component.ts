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
    isLinear = true; // ???TODO - What does it do. Investigate.
    firstFormGroup = this._formBuilder.group({
        firstCtrl: [Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });
    
    allHairServices$!: any;
    displayedColumns: string[] = ['checkBox', '#', 'name', 'duration', 'price'];

    // SelectionModel has 2 parameters (bolean for multiple selection, initial value).
    selection = new SelectionModel<any>(true, []);

    employeesByHairServices!: any;
    appointmentDuration: any;
    appointmentPrice: any;

    selectedEmployeeId!: any;

    currentDate = new Date();

    selectedDate!: any;

    validIntervals: any;

    customerId = String(localStorage.getItem('id'));

    constructor(
        public hairdresserService: HairDresserService,
        private popUpMessagesService: PopUpMessagesService,
        private router: Router,
        private _formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.allHairServices$ = this.hairdresserService.getAllHairServices();
    }

    // Prevent Saturday and Sunday from being selected.
    weekendFilter = (d: Date | null): boolean => {
        const day = (d || new Date()).getDay();
        return day !== 0 && day !== 6;
    };

    getDataBySelectedHairServices() {
        this.getEmployeesForAppointment();
        this.getDurationForAppointment();
        this.getPriceForAppointment();
    }

    getEmployeesForAppointment() {
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
        this.selectedEmployeeId = employeeId;
        this.popUpMessagesService.showPopUpMessage("Employee saved", "OK", "success");
    }

    getSelectedDate(date: any) {
        this.selectedDate = date.value;
    }

    getValidIntervalsForAppointment() {
        this.hairdresserService.getValidIntervals(this.selectedEmployeeId, this.selectedDate, this.appointmentDuration, this.customerId)
        .subscribe({
            next: (res) => this.validIntervals = res,
            error: (e) => this.popUpMessagesService.showPopUpMessage("The employee has no working intervals in this day", "OK", "error"),
        });
    }

    createAppointment(interval: any) {
        type ObjectKey = keyof typeof interval;
        const startDateProp = 'startDate' as ObjectKey;
        const endDateProp = 'endDate' as ObjectKey;
        let appointment: Appointment = {
            customerId: this.customerId,
            employeeId: this.selectedEmployeeId,
            hairServicesIds: this.selection.selected.map(hairService => hairService.id),
            startDate: interval[startDateProp],
            endDate: interval[endDateProp],
            price: this.appointmentPrice
        }
        
        this.hairdresserService.postAppointment(appointment)
        .subscribe({
            next: (res) => {
                this.popUpMessagesService.showPopUpMessage("Appointment successfully created!", "OK", "success");
                this.router.navigate(['profile/customer/appointment/in-work']);
            },
            error: (e) => this.popUpMessagesService.showPopUpMessage(e.message, "OK", "error"),
        })
    }
}
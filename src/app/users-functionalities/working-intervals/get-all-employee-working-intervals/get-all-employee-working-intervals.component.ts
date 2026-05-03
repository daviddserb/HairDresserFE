import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-employee-working-intervals',
  templateUrl: './get-all-employee-working-intervals.component.html',
  styleUrls: ['./get-all-employee-working-intervals.component.css']
})
export class GetAllEmployeeWorkingIntervalsComponent implements OnInit {
  employeeWorkingIntervals$: any;

  displayedColumns: string[] = ['#', 'workingDay', 'startTime', 'endTime', 'actions'];

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService,
    ) {}

  ngOnInit(): void {
    this.getWorkingIntervals();
  }

  getWorkingIntervals() {
    let employeeId = String(localStorage.getItem('id'));

    this.hairdresserService.getAllEmployeeWorkingIntervalsByEmployeeId(employeeId)
    .subscribe({
      next: (res) =>  {
        res.sort(this.sortByDay);
        this.employeeWorkingIntervals$ = res;
      },
      error: (err) => {
        if (typeof err.error == "object") {
          this.popUpMessagesService.showPopUpMessage(err.error.Message, "OK", "error");
        } else {
          this.popUpMessagesService.showPopUpMessage(err.error, "OK", "error");
        }
      },
    });
  }

  sortByDay = (a: any, b: any) => {
    return (a.workingDay.id < b.workingDay.id) ? -1 : (a.workingDay.id > b.workingDay.id) ? 1 : 0;
  }

  deleteWorkingInterval(workingIntervalId: number) {
    this.hairdresserService.deleteWorkingIntervalById(workingIntervalId)
    .subscribe({
      next: (res) => this.popUpMessagesService.showPopUpMessage("Successfully deleted the selected working interval!", "OK", "success"),
      error: (err) => this.popUpMessagesService.showPopUpMessage("Error!", "OK", "error"),
    });
  }
}

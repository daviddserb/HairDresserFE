import { Component, OnInit } from '@angular/core';
import { Hair } from 'src/app/models/Hair';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { Observable, of } from "rxjs";
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-hair-services',
  templateUrl: './get-all-hair-services.component.html',
  styleUrls: ['./get-all-hair-services.component.css']
})
export class GetAllHairServicesComponent implements OnInit {
  public hairServices$!: Observable<Hair[]>;

  displayedColumns: string[] = ['#', 'name', 'duration', 'price'];

  loggedInUserInfo!: any;

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService
    ) {}

  ngOnInit(): void {
    let loggedInUserId = localStorage.getItem('id');

    if (loggedInUserId != null) {
      this.hairdresserService.getUserWithRoleById(loggedInUserId)
      .subscribe({
        next: (response) => {
          console.log("loggedInUserInfo= ", response);
          this.loggedInUserInfo = response;

          if (this.loggedInUserInfo.role.includes('admin')) {
            this.displayedColumns.push('actions');
          }
        },
        error: (e) => console.log("Wrong id!")
      });
    }
    
    this.hairServices$ = this.hairdresserService.getAllHairServices();
    // ??? Se randeaza pe pagina, dar am eroare in consola de pe pagina: get-all-hair-services.component.ts:29  ERROR TypeError: Cannot read properties of undefined (reading 'length')
    // this.hairdresserService.getAllHairServices().subscribe
    // ({
    //   next: (data) => {
    //     console.log("data=", data);
    //     // Convert the array (data) to an Observable using the `of` operator
    //     this.hairServices$ = of(data);
    //   },
    //   error: (error) => console.error(error),
    // });
  }

  deleteHairService(hairServiceId: number) {
    this.hairdresserService.deleteHairServiceById(hairServiceId)
    .subscribe({
      error: (e) => this.popUpMessagesService.showPopUpMessage("Could not delete the hair service!", "OK", "error"),
      complete: () => {
        window.location.reload();
        this.popUpMessagesService.showPopUpMessage("Hair service deleted!", "OK", "success")
      }
    });
  }
}
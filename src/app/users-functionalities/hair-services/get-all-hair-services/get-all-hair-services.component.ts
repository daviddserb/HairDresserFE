import { Component, OnInit } from '@angular/core';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-hair-services',
  templateUrl: './get-all-hair-services.component.html',
  styleUrls: ['./get-all-hair-services.component.css']
})
export class GetAllHairServicesComponent implements OnInit {
  allHairServices$: any;

  displayedColumns: string[] = ['#', 'name', 'duration', 'price', 'actions'];

  constructor(
    private hairdresserService: HairDresserService,
    private popUpMessagesService: PopUpMessagesService
    ) {}

  ngOnInit(): void {
    this.allHairServices$ = this.hairdresserService.getAllHairServices();
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
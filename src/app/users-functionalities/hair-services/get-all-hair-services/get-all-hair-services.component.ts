import { Component, OnInit } from '@angular/core';
import { HairService } from 'src/app/models/HairService';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { Observable, of } from "rxjs";
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
    selector: 'app-get-all-hair-services',
    templateUrl: './get-all-hair-services.component.html',
    styleUrls: ['./get-all-hair-services.component.css']
})
export class GetAllHairServicesComponent implements OnInit {
    public hairServices$!: Observable<HairService[]>;

    displayedColumns: string[] = ['#', 'name', 'duration', 'price'];
    loggedInUserInfo!: any;

    constructor(
        private hairdresserService: HairDresserService,
        private popUpMessagesService: PopUpMessagesService) {}

    ngOnInit(): void {
        let loggedInUserId = localStorage.getItem('id');

        if (loggedInUserId != null) {
            this.hairdresserService.getUserWithRoleById(loggedInUserId)
            .subscribe({
                next: (response) => {
                    this.loggedInUserInfo = response;
                    if (this.loggedInUserInfo.role.includes('admin')) {
                        this.displayedColumns.push('actions');
                    }
                },
                error: (err) => {},
            });
        }
        
        this.hairdresserService.getAllHairServices()
        .subscribe({
            next: (response) => this.hairServices$ = of(response),
            error: (error) => console.error(error),
        });
    }

    deleteHairService(hairServiceId: number) {
        this.hairdresserService.deleteHairServiceById(hairServiceId)
        .subscribe({
            error: (err) => this.popUpMessagesService.showPopUpMessage("Could not delete the hair service!", "OK", "error"),
            complete: () => {
                window.location.reload();
                this.popUpMessagesService.showPopUpMessage("Hair service deleted!", "OK", "success")
            }
        });
    }
}
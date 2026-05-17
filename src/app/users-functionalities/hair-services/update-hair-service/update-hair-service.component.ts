import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { ActivatedRoute } from '@angular/router'
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';

@Component({
    selector: 'app-update',
    templateUrl: './update-hair-service.component.html',
    styleUrls: ['./update-hair-service.component.css']
})
export class UpdateHairServiceComponent implements OnInit {
    formHairServiceEdited = new FormGroup({
        name: new FormControl(),
        durationInMinutes: new FormControl(),
        price: new FormControl(),
    });

    hairServiceId!: number;

    constructor(
        private hairdresserService: HairDresserService,
        private router: ActivatedRoute,
        private popUpMessagesService: PopUpMessagesService) {}

    get formGetter() { return this.formHairServiceEdited.controls; }

    ngOnInit(): void {
        //Get the id, from the route, of the selected hair service.
        this.hairServiceId = this.router.snapshot.params['id'];

        this.hairdresserService.getHairServiceById(this.router.snapshot.params['id'])
        .subscribe((result) => {
            const name = Object(result)["name"];
            const duration = Object(result)["duration"];
            const durationSplit = duration.split(':');
            const durationInMinutes = (+durationSplit[0]) * 60 + (+durationSplit[1]);
            const price = Object(result)["price"];

            this.formHairServiceEdited = new FormGroup({
                name: new FormControl(name, Validators.required),
                durationInMinutes: new FormControl(durationInMinutes, Validators.required),
                price: new FormControl(price, Validators.required),
            });
        });
    }

    updateHairService() {
        let infoHairService = this.formHairServiceEdited.value;
        this.hairdresserService.putHairService(this.hairServiceId, infoHairService)
        .subscribe({
            error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to update the hair service!", "OK", "error"),
            complete: () => this.popUpMessagesService.showPopUpMessage("Hair service updated!", "OK", "success"),
        });
    }
}
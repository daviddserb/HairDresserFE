import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-create-hair-service',
  templateUrl: './create-hair-service.component.html',
  styleUrls: ['./create-hair-service.component.css']
})
export class CreateHairServiceComponent implements OnInit {
  formHairService = new FormGroup({
    name: new FormControl('', Validators.required),
    durationInMinutes: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
  }

  get formGetter() { return this.formHairService.controls; }

  createHairService() {
    console.log("createHairService():");

    let infoHairService = this.formHairService.value;
    console.log("infoHairService:");
    console.log(infoHairService);

    this.hairdresserService.postHairService(infoHairService).subscribe();
  }

}

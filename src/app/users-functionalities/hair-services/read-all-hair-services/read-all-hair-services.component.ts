import { Component, OnInit } from '@angular/core';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-read-all-hair-services',
  templateUrl: './read-all-hair-services.component.html',
  styleUrls: ['./read-all-hair-services.component.css']
})
export class ReadAllHairServicesComponent implements OnInit {

  allHairServices$: any;

  displayedColumns: string[] = ['id', 'name', 'duration', 'price', 'actions'];
  
  constructor(private hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    this.allHairServices$ = this.hairdresserService.getAllHairServices();
  }

  deleteHairService(hairServiceId: number) {
    this.hairdresserService.deleteHairServiceById(hairServiceId).subscribe();
  }
}

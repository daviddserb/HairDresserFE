import { Component, OnInit } from '@angular/core';
import { timeout } from 'rxjs';
import { LoaderService } from 'src/app/loader/loader.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-get-all-hair-services',
  templateUrl: './get-all-hair-services.component.html',
  styleUrls: ['./get-all-hair-services.component.css']
})
export class GetAllHairServicesComponent implements OnInit {
  allHairServices$: any;

  displayedColumns: string[] = ['id', 'name', 'duration', 'price', 'actions'];

  constructor(
    private hairdresserService: HairDresserService,
    public loaderService: LoaderService
    ) {}

  ngOnInit(): void {
    this.allHairServices$ = this.hairdresserService.getAllHairServices();
  }

  deleteHairService(hairServiceId: number) {
    this.hairdresserService.deleteHairServiceById(hairServiceId).subscribe();
  }
}
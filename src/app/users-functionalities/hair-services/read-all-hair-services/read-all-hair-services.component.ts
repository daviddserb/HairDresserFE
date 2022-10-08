import { Component, OnInit } from '@angular/core';
import { LoaderService } from 'src/app/loader/loader.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-read-all-hair-services',
  templateUrl: './read-all-hair-services.component.html',
  styleUrls: ['./read-all-hair-services.component.css']
})
export class ReadAllHairServicesComponent implements OnInit {
  allHairServices$: any;

  displayedColumns: string[] = ['id', 'name', 'duration', 'price', 'actions'];

  constructor(
    private hairdresserService: HairDresserService,
    public loaderService: LoaderService,
    ) { }

  ngOnInit(): void {
    // Timeout just for testing.
    setTimeout(() => {
      this.allHairServices$ = this.hairdresserService.getAllHairServices();
    }, 2000);
  }

  deleteHairService(hairServiceId: number) {
    this.hairdresserService.deleteHairServiceById(hairServiceId).subscribe();
  }
}

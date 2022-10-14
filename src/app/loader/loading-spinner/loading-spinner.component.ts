import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent implements OnInit {
  loader$: Subject<boolean> = this.loaderService.appLoader;
  
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
  }

}

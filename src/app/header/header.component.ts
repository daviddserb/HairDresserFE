import { Component, OnInit } from '@angular/core';
import { HairDresserService } from '../services/hairdresser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUserInfo!: any;

  constructor(
    private hairdresserService: HairDresserService,
  ) {}

  ngOnInit(): void {
    console.log("############# ngOnInit header component");

    let loggedInUserId = localStorage.getItem('id');
    console.log("loggedInUserId= ", loggedInUserId);
    console.log("loggedInUserInfo= ", this.loggedInUserInfo);

    console.log("inainte if")
    if (loggedInUserId != null) {
      console.log("se intra")
      this.hairdresserService.getUserById(loggedInUserId)
      .subscribe({
        next: (response) => {
          console.log("response= ", response);
          this.loggedInUserInfo = response;
        },
        error: (e) => console.log("Wrong id!")
      });
    }
  }

}

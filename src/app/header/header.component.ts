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
    console.log("-> header");

    let loggedInUserId = localStorage.getItem('id');
    console.log("logged in user id= ", loggedInUserId);
    console.log("logged in user info= ", this.loggedInUserInfo);

    if (loggedInUserId != null) {
      this.hairdresserService.getUserById(loggedInUserId)
      .subscribe({
        next: (response) => {
          console.log("response (logged in user info)= ", response);
          this.loggedInUserInfo = response;
        },
        error: (e) => console.log("Wrong id!")
      });
    }
  }

}

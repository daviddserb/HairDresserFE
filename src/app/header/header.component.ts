import { Component, OnInit } from '@angular/core';
import { HairDresserService } from '../services/hairdresser.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedInUserInfo!: any;

  constructor(private hairdresserService: HairDresserService) {}

  ngOnInit(): void {
    let loggedInUserId = localStorage.getItem('id');
    
    if (loggedInUserId != null) {
      this.hairdresserService.getUserWithRoleById(loggedInUserId)
      .subscribe({
        next: (response) => {
          
          this.loggedInUserInfo = response;
        },
        error: (e) =>  {},
      });
    }
  }

  assignCustomerRole() {
    
    this.hairdresserService.assignRole(this.loggedInUserInfo.username, "customer")
    .subscribe({
      next: (response) => {
        
        window.location.reload();
      },
      error: (e) =>  {},
    });
  }

  logOutUser() {
    this.hairdresserService.logOutUser();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private hairdresserService: HairDresserService,
    private router: Router,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
  }

  loginUser(item: any) {
    console.log("item.value (user info):")
    console.log(item.value);

    this.hairdresserService
    .logInUser(item.value.username, item.value.password)
    .subscribe(response => {
      this.popUpMessagesService.showPopUpMessage("Successfully logged in your account!", "OK", "success");
      console.log("response:");
      console.log(response); // The response from the back-end, from the UsersController -> Login().
      this.router.navigate(['profile']);
    }, err => {
      this.popUpMessagesService.showPopUpMessage("This account doesn't exist!", "OK", "error");
      console.log("err:");
      console.log(err);
    });
  }

}

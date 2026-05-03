import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { MyToken } from 'src/app/models/MyToken';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

  constructor
  (
    private hairdresserService: HairDresserService,
    private router: Router,
    private popUpMessagesService: PopUpMessagesService
    ) {}

  loginUser(item: any) {
    
    
    this.hairdresserService.logInUser(item.username, item.password)
    .subscribe({
      next: (response) => {
        type ObjectKey = keyof typeof response;
        const token = 'token' as ObjectKey;
        this.decodeToken(response[token]);
      },
      error: (err) => this.popUpMessagesService.showPopUpMessage("This account doesn't exist!", "OK", "error"),
      complete: () =>  {
        this.popUpMessagesService.showPopUpMessage("Successfully logged in your account!", "OK", "success");
        this.router.navigate(['/profile']);
      }
    });
  }

  decodeToken(token: string): MyToken {
    //keep for debugging purposes
    const decodedToken = jwt_decode<MyToken>(token);
    return jwt_decode(token);
  }
}
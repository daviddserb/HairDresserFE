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
    console.log("item= ", item);
    
    this.hairdresserService.logInUser(item.username, item.password)
    .subscribe({
      next: (response) => {
        console.log("token from back-end= ", response);

        type ObjectKey = keyof typeof response;
        const token = 'token' as ObjectKey;
        this.decodeToken(response[token]);
      },
      error: (e) => this.popUpMessagesService.showPopUpMessage("This account doesn't exist!", "OK", "error"),
      complete: () =>  {
        this.popUpMessagesService.showPopUpMessage("Successfully logged in your account!", "OK", "success");
        this.router.navigate(['/profile']);
      }
    });
  }

  decodeToken(token: string): MyToken {
    console.log("token= ", token);
    const decodedToken = jwt_decode<MyToken>(token);
    console.log("decoded token= ", decodedToken);
    console.log("info from decoded token:");
    console.log("username= (" + decodedToken.username + ")");
    console.log("password= (" + decodedToken.password + ")");
    console.log("role= (" + decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] + ")");
    return jwt_decode(token);
  }
}
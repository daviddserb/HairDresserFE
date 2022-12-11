import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(
    private hairdresserService: HairDresserService,
    private router: Router,
    private popUpMessagesService: PopUpMessagesService,) {}

  ngOnInit(): void {}

  loginUser(item: any) {
    console.log("user input= ", item.value)

    this.hairdresserService.logInUser(item.value.username, item.value.password)
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
      }
    });
  }

  decodeToken(token: string): MyToken { // ??? : MyToken
    console.log("decodeToken(): ");
    
    console.log("token= ", token);
    const decodedToken = jwt_decode<MyToken>(token);

    console.log("decoded token= ", decodedToken);
    console.log("info from decoded token:");
    console.log(decodedToken.username);
    console.log(decodedToken.password);
    console.log(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);

    if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'admin') {
      this.router.navigate(['/admin']);
    } else if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'employee') {
      this.router.navigate(['/employee']);
    } else if (decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'customer') {
      this.router.navigate(['/customer']);
    } else {
      // ???
    }
    
    return jwt_decode(token); // ???
  }

}

interface MyToken {
  username: string;
  password: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}
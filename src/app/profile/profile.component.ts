import { Component, OnInit } from '@angular/core';
import { HairDresserService } from '../services/hairdresser.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedInUserToken = this.hairdresserService.loggedInUser_Token;

  constructor(public hairdresserService: HairDresserService) { }

  ngOnInit(): void {
    // Find out the role (admin/customer/employee) of the logged in user by decoding the JWT
    this.getDecodedAccessToken(this.loggedInUserToken!);
  }

  getDecodedAccessToken(token: string) {
    console.log("getDecodedAccessToken")
    const decodedToken = jwt_decode<MyToken>(token);
    console.log(typeof decodedToken);
    console.log("------------");
    console.log(decodedToken.username);
    //console.log(decodedToken.role);
    return jwt_decode(token);
  }

}

interface MyToken {
  // Whatever properties are in the JWT.
  username: string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
}
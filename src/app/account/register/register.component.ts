import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';
import { Observable } from "rxjs";
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required, this.noWhitespaceAllowed], [this.uniqueUsername.bind(this)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', Validators.required),
  });

  allUsers: User[];

  constructor
  (
    private hairdresserService: HairDresserService,
    private router: Router,
    private popUpMessagesService: PopUpMessagesService
  )
  {}

  ngOnInit(): void {
    this.hairdresserService.getAllUsers().subscribe((data) => {
      this.allUsers = data;
      console.log("all users= ", this.allUsers)
    });
  }

  // To access the input values in the HTML
  get formGetter() { return this.registerForm.controls; }

  createAccount() {
    // To get the input values in the TS
    let userInfo = this.registerForm.value;
    console.log(userInfo);

    this.hairdresserService.registerUser(userInfo).subscribe
    ({
      next: (next) => console.log("next= ", next),
      error: (error) => this.popUpMessagesService.showPopUpMessage("Failed to save account!", "OK", "error"),
      complete: () =>  {
        this.popUpMessagesService.showPopUpMessage("Account successfully created!", "OK", "success");
        this.router.navigate(['log-in']);
      }
    });
  }

  // Custom Validation
  noWhitespaceAllowed(control: FormControl): {[s: string]: boolean} {
    if(/\s/.test(control.value)) return {'noSpaceAllowed': true}
    return null; // if there is no error (errors) you have to return null
  }

  // Custom Async Validation
  uniqueUsername(control: FormControl): Promise<any> | Observable<any> {
    console.log("####### uniqueUsername:");
    const response = new Promise((resolve, reject) => {
      const usernameExists = this.allUsers.some((user) => user.username === control.value);
      console.log("usernameExists=", usernameExists);
      if (usernameExists === true) {
        resolve({uniqueUsername: true});
      } else {
        resolve(null);
      }
    });
    return response;
  }
}
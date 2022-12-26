import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpMessagesService } from 'src/app/pop-up-messages/pop-up-messages.service';
import { HairDresserService } from 'src/app/services/hairdresser.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    // name: new FormControl('', Validators.required),
    username: new FormControl('', [Validators.required, this.noWhitespaceAllowed]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, this.noLettersAllowed]),
    address: new FormControl('', Validators.required),
  });

  apiUrl = "https://localhost:7192/api";

  constructor(private hairdresserService: HairDresserService,
    private router: Router,
    private popUpMessagesService: PopUpMessagesService) { }

  ngOnInit(): void {
  }

  createAccount() {
    // TODO: Use EventEmitter with form value
    let userInfo = this.registerForm.value;
    console.log(userInfo);

    this.hairdresserService
    .registerUser(userInfo)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => this.popUpMessagesService.showPopUpMessage("Failed to save account!", "OK", "error"),
      complete: () =>  {
        this.popUpMessagesService.showPopUpMessage("Account successfully created!", "OK", "success");
        this.router.navigate(['log-in']);
      }
    });
  }

  get formGetter() { return this.registerForm.controls; }

  noWhitespaceAllowed(control: FormControl) {
    if(/\s/.test(control.value)) return {noSpaceAllowed: true}
    return null;
  }

  noLettersAllowed(control: FormControl) {
    let regExp = /[a-zA-Z]/g;
    if (regExp.test(control.value)) return {noLetterAllowed: true};
    return null;
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
    console.log("isAuthenticated called.");
    if (localStorage.getItem('token')) return true;
    return false;
  }
}

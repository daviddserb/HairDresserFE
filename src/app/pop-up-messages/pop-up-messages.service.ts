import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotifierComponent } from '../notifier/notifier.component';

@Injectable({
  providedIn: 'root'
})
export class PopUpMessagesService {

  constructor(private snackBar: MatSnackBar) { }

  showPopUpMessage(displayMessage: string, buttonText: string, messageType: 'error' | 'success') {
    this.snackBar.openFromComponent(NotifierComponent, {
      // What we pass to the component.
      data: {
        message: displayMessage,
        type: messageType,
        buttonText: buttonText
      },

      // What we do to the button.
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: messageType
    })
  }
}

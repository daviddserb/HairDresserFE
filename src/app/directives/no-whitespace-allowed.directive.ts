import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appNoWhitespaceAllowed]',
  providers: [{provide: NG_VALIDATORS,
    useExisting: NoWhitespaceAllowedDirective,
    multi: true
  }]
})
export class NoWhitespaceAllowedDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    const elementValue = control.value;
    if(/\s/.test(control.value)) return {noSpaceAllowed: true}
    return null; // if there is no error (errors) you have to return null, it is compulsory
  
    // aici mai poti adauga si alte verificari, de ex. verifici sa nu aiba si numere, practic faci mai multe verificari in aceeasi functie
  }
}

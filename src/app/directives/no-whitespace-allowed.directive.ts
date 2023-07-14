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
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if(/\s/.test(control.value)) return {noSpaceAllowed: true}
    return null; // if there is no error (errors) you have to return null, it is compulsory
  }
}

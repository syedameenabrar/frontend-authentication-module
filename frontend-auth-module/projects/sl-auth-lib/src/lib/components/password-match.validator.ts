import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function PasswordMatchValidator(password: string, confirmPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwordControl = control.get(password);
    const confirmPasswordControl = control.get(confirmPassword);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      if (confirmPasswordControl.errors) {
        delete confirmPasswordControl.errors['passwordMismatch'];
        if (!Object.keys(confirmPasswordControl.errors).length) {
          confirmPasswordControl.setErrors(null);
        }
      }
      return null;
    }
  };
}

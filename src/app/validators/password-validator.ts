import { Validation } from '../models/validation';
import { FormGroup } from '@angular/forms';
import { passwordPattern } from '../statics/patterns';

export const passwordValidator = (password: string): Validation => {
  const digit = /\d/.test(password);
  const length = password.length >= 8 && password.length <= 15;
  const specialChar = /[_@$!%*?&]/.test(password);
  const upperCaseChar = /[A-Z]/.test(password);
  const validation: Validation = { digit, length, specialChar, upperCaseChar };
  return validation;
};

export const formPasswordValidator = function (form: FormGroup) {
  const passwordInput = form.get('password');
  const password = passwordInput.value;
  const passwordValid = passwordPattern.test(password);
  if (passwordValid) {
    passwordInput.setErrors(null);
    return null;
  }
  passwordInput.setErrors({ mismatch: true });
  return { mismatch: true };
};

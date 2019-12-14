import { FormGroup } from '@angular/forms';

export default function confirmPassword(form: FormGroup) {
  const password = form.get('newPassword').value;
  const confirmPassword = form.get('confirmPassword').value;
  const confirmPasswordInput = form.get('confirmPassword');
  if (password === confirmPassword) {
    !confirmPasswordInput.hasError('required')
    && confirmPasswordInput.setErrors(null);
    return null;
  }
  confirmPasswordInput.setErrors({ mismatch: true });
  return { mismatch: true };
}

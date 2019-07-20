import { AbstractControl } from '@angular/forms';

export function emailValidator(emailControl: AbstractControl) {

  if (emailControl && (emailControl.value !== null || emailControl.value !== undefined)) {
    const email = new RegExp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    if (emailControl.value === '' || emailControl.value === null) {
      return {
        isEmpty: true,
      };

    } else if (!email.test(emailControl.value)) {
      return {
        isInvalid: true
      };
    }
  }

  return null;

}

export function nameValidator(nameControl: AbstractControl) {

  if (nameControl && (nameControl.value !== null || nameControl.value !== undefined)) {

    if (nameControl.value === '' || nameControl.value === null) {
      return {
        isEmpty: true,
      };

    } else if (nameControl.value.length < 3) {
      return {
        isInvalid: true
      };
    }
  }

  return null;

}

export function ageValidator(ageControl: AbstractControl) {

  if (ageControl && (ageControl.value !== null || ageControl.value !== undefined)) {

    if (ageControl.value === '' || ageControl.value === null) {
      return {
        isEmpty: true,
      };

    } else if ((isNaN(ageControl.value)) || (ageControl.value > 65) || (ageControl.value < 18)) {
      return {
        isInvalid: true
      };
    }
  }

  return null;

}

export function contactValidator(contactControl: AbstractControl) {

  if (contactControl && (contactControl.value !== null || contactControl.value !== undefined)) {

    if (contactControl.value === '' || contactControl.value === null) {
      return {
        isEmpty: true,
      };

    } else if ((isNaN(contactControl.value)) || (contactControl.value.length > 10) || (contactControl.value.length < 10)) {
      return {
        isInvalid: true
      };
    }
  }

  return null;

}

export function skillsValidator(skillsControl: AbstractControl) {

  if (skillsControl && (skillsControl.value !== null || skillsControl.value !== undefined)) {

    if (skillsControl.value.length === 1) {
      return {
        isInvalid: true,
      };
    }

  }

  return null;

}

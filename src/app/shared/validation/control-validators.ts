import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
/**
 * Regular expressions
 */
export const onlyEnglishAndNumbersAndSpaceRgx = /^[a-zA-Z0-9,.\s-\/']+$/;
export const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])[!@#$%^()_[\]\{}|;':",.\/<>?a-zA-Z0-9-]+$/;
export const ALLOWED_SPECIAL_CHARACTERS_REGEX = /[!@#$%^()_\-[\]\{}|;':",.\/<>?]/; // not allowed: &*+`~=
export const VALID_LINK_REGEX =
    /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
export const ONLY_HEBREW_ALLOWED_REGEX = /^[\u0590-\u05fe\s]+$/i;
/**
 * Custom Validators
 */
export const passwordRgxPatternValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: { message: string } } | null => {
        // if the value given is empty string then we return null because these fields are optional
        if (control.value === '') {
            return null;
        }
        if (!PASSWORD_REGEX.test(control.value)) {
            return {
                passwordSpecialCharaters: {
                    message: 'One of the characters entered is invalid.',
                },
            };
        }
        return null;
    };
};
export const customMinValidator = (data: { min: number; errorObjectName: string }): ValidatorFn => {
    const { min, errorObjectName } = data;
    return (control: AbstractControl): { [key: string]: { message: string; min: number; actual: number } } | null => {
        // if the value given is empty string then we return null because these fields are optional
        if (control.value >= min) {
            return null;
        } else {
            return {
                [errorObjectName]: {
                    min,
                    actual: control.value,
                    message: 'Min amount not provided.',
                },
            };
        }
    };
};

export const onlyEnglishAndNumbersAndSpaceValidator = (): ValidatorFn => {
    return (control: AbstractControl): { [key: string]: { message: string } } | null => {
        // if the value given is empty string then we return null because these fields are optional
        if (control.value === '') {
            return null;
        }
        if (!onlyEnglishAndNumbersAndSpaceRgx.test(control.value)) {
            return {
                not_english_and_numbers_and_space: {
                    message: 'Only English letters and numbers are allowed.',
                },
            };
        }

        return null;
    };
};

type ValidationErrors = {
    [key: string]: any;
};

export const pwdConfirming = (data: { key: string; confirmationKey: string }) => {
    const { key, confirmationKey } = data;

    const validator = (group: FormGroup): ValidationErrors | null => {
        const input = group.controls[key];
        const confirmationInput = group.controls[confirmationKey];
        return input.value !== confirmationInput.value ? { passwordNotEquivalent: true } : null;
    };
    return validator;
};
export const websitesValidators: ValidatorFn[] = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(100),
    Validators.pattern(VALID_LINK_REGEX),
];

export function matchValidator(
    matchTo: string
): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const matchToControl = control.parent?.controls?.[matchTo] as AbstractControl;

        return Boolean(control.parent) &&
        Boolean(control.parent.value) &&
        control.value === matchToControl.value ? null : {notMatching: true};
    };
}

export const phoneValidators: ValidatorFn[] = [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)];
export const emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
export const enAndNumbersAndSpaceValidators: ValidatorFn = Validators.pattern(onlyEnglishAndNumbersAndSpaceRgx);
export const onlyNumbersValidators: ValidatorFn = Validators.pattern(/^[0-9]*$/);

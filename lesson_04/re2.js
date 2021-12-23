const nameRe = /^[a-zA-Z]+$/;
const phoneRe = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
const emailRe = /^my[.-]?mail@mail.ru$/;

const nameInput = document.getElementById('user-name');
const phoneInput = document.getElementById('user-phone');
const emailInput = document.getElementById('user-email');

class FieldValidator {
    constructor(field, re, error_span_id) {
        this.is_valid = true;
        this.error_span = error_span_id;
        field.addEventListener('input', () => {
            if (re.test(field.value)) {
                field.className = 'valid';
                this.is_valid = true;
            } else {
                field.className = 'invalid';
                this.is_valid = false;
            }
        });

    }
}

class FormValidator {
    constructor(form, ...validators) {
        this.validators = validators;
        form.addEventListener('submit', (event) => {
            for (let validator of this.validators) {
                if (!validator.is_valid) {
                    event.preventDefault();
                    document.getElementById(validator.error_span).hidden = false;
                }
            }
        })
    }
}

const nameValidator = new FieldValidator(nameInput, nameRe, "user-name-error");
const phoneValidator = new FieldValidator(phoneInput, phoneRe, "user-phone-error");
const emailValidator = new FieldValidator(emailInput, emailRe, "user-email-error");

const formValidator = new FormValidator(document.getElementById('form'),
    nameValidator, phoneValidator, emailValidator);
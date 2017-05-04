import BaseValidator from './baseValidator';

class PasswordValidator extends BaseValidator {
    static validate(value) {
        return (value !== null) && (value.length > 7);
    }
}

export default PasswordValidator;
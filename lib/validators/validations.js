import * as validators from "@dpanet/prayers-lib/lib/validators/interface.validators.js";
//import * as prayer from "@dpanet/prayers-lib/lib/entities/prayer";
import Joi from '@hapi/joi';
export class PrayerMangerValidator extends validators.Validator {
    constructor() {
        super("PrayerManagerValidator");
        this.setSchema();
    }
    setSchema() {
        this._prayerManagerSchema = Joi.any()
            .required()
            .label("Prayer Manager")
            .error(this.processErrorMessage);
    }
    validate(validateObject) {
        return super.genericValidator(Joi.validate(validateObject, this._prayerManagerSchema, { abortEarly: false, allowUnknown: true }));
    }
    static createValidator() {
        return new PrayerMangerValidator();
    }
}
export class UserValidator extends validators.Validator {
    constructor() {
        super("UserValidator");
        this.setSchema();
    }
    setSchema() {
        this._userSchema = Joi.object({
            username: Joi.string().alphanum().min(3).max(16).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required()
        }).with('username', 'password');
    }
    validate(validateObject) {
        return super.genericValidator(Joi.validate(validateObject, this._userSchema, { abortEarly: false, allowUnknown: true }));
    }
    static createValidator() {
        return new UserValidator();
    }
}
export * from "@dpanet/prayers-lib/lib/validators/interface.validators";
export * from "@dpanet/prayers-lib/lib/validators/validator";
//# sourceMappingURL=validations.js.map
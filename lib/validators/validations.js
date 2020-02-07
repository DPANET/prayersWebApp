"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const validators = __importStar(require("@dpanet/prayers-lib/lib/validators/interface.validators"));
//import * as prayer from "@dpanet/prayers-lib/lib/entities/prayer";
const Joi = require("@hapi/joi");
class PrayerMangerValidator extends validators.Validator {
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
exports.PrayerMangerValidator = PrayerMangerValidator;
class UserValidator extends validators.Validator {
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
exports.UserValidator = UserValidator;
__export(require("@dpanet/prayers-lib/lib/validators/interface.validators"));
__export(require("@dpanet/prayers-lib/lib/validators/validator"));
//# sourceMappingURL=validations.js.map
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("@dpanet/prayers-lib/lib/validators/validator");
const prayer = __importStar(require("@dpanet/prayers-lib/lib/entities/prayer"));
const Joi = require("@hapi/joi");
const ramda_1 = __importDefault(require("ramda"));
class PrayerMangerValidator extends validator_1.validators.Validator {
    constructor() {
        super("PrayerManagerValidator");
        this.setSchema();
        -;
    }
    setSchema() {
        this._adjustmentsSchema = Joi.object().keys({
            prayerName: Joi.string()
                .label('Prayer Name')
                .valid(ramda_1.default.values(prayer.PrayersName))
                .required()
                .error(this.processErrorMessage),
            adjustments: Joi.number()
                .required()
                .label('Adjustments')
                .error(this.processErrorMessage)
            // .error((errors) => errors.map((err) => this.processErrorMessage(err)))
        });
        this._configSchema = Joi.object().keys({
            startDate: Joi
                .date()
                .max(Joi.ref('endDate')).error(() => "End Date should be less than Start Date")
                .required()
                .label('Start Date')
                .error(this.processErrorMessage),
            endDate: Joi.date()
                .required()
                .label('End Date')
                .error(this.processErrorMessage),
            method: Joi
                .number()
                .valid(ramda_1.default.values(prayer.Methods))
                .label('Prayer Method')
                .required()
                .error(this.processErrorMessage),
            school: Joi.number()
                .required()
                .label('School')
                .valid(ramda_1.default.values(prayer.Schools))
                .error(this.processErrorMessage),
            latitudeAdjustment: Joi.number()
                .required()
                .label('Latitude Adjustment')
                .valid(ramda_1.default.values(prayer.LatitudeMethod))
                .error(this.processErrorMessage),
            adjustmentMethod: Joi.number().required()
                .valid(ramda_1.default.values(prayer.AdjsutmentMethod))
                .label('Adjust Method')
                .error(this.processErrorMessage),
            adjustments: Joi.array()
                .items(this._adjustmentsSchema)
                .unique()
                .label('Adjustments')
                .error(this.processErrorMessage, { self: true })
        }).error(this.processErrorMessage, { self: true });
    }
    validate(validateObject) {
        return super.genericValidator(() => Joi.validate(validateObject, this._configSchema, { abortEarly: false, allowUnknown: true }));
    }
    static createValidator() {
        return new PrayerMangerValidator();
    }
}
exports.PrayerMangerValidator = PrayerMangerValidator;
//# sourceMappingURL=validations.js.map
import {validators} from  "@dpanet/prayers-lib/lib/validators/validator";
import {IPrayerManager} from "@dpanet/prayers-lib/lib/managers/interface.manager";
import * as prayer from "@dpanet/prayers-lib/lib/entities/prayer";
import Joi = require('@hapi/joi');
import ramda from "ramda";
export class PrayerMangerValidator extends validators.Validator<IPrayerManager>
{

    private _configSchema: object;
    private _adjustmentsSchema: object;
    private constructor() 
    {
       super("PrayerManagerValidator");
       this.setSchema();
-
    }
    private setSchema(): void {
        this._adjustmentsSchema = Joi.object().keys({
            prayerName: Joi.string()
                .label('Prayer Name')
                .valid(ramda.values(prayer.PrayersName))
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
                .valid(ramda.values(prayer.Methods))
                .label('Prayer Method')
                .required()
                .error(this.processErrorMessage),
            school: Joi.number()
                .required()
                .label('School')
                .valid(ramda.values(prayer.Schools))
                .error(this.processErrorMessage),
            latitudeAdjustment: Joi.number()
                .required()
                .label('Latitude Adjustment')
                .valid(ramda.values(prayer.LatitudeMethod))
                .error(this.processErrorMessage),
            adjustmentMethod: Joi.number().required()
                .valid(ramda.values(prayer.AdjsutmentMethod))
                .label('Adjust Method')
                .error(this.processErrorMessage),
            adjustments: Joi.array()
                .items(this._adjustmentsSchema)
                .unique()
                .label('Adjustments')
                .error(this.processErrorMessage, { self: true })
        }).error(this.processErrorMessage, { self: true })

    }
    public validate(validateObject: IPrayerManager): boolean {
        return  super.genericValidator(() => Joi.validate(validateObject, this._configSchema, { abortEarly: false, allowUnknown: true }));
    }
    public static createValidator(): validators.IValid<IPrayerManager> {
        return new PrayerMangerValidator();
    }
}
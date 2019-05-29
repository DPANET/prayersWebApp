import * as validators from  "@dpanet/prayers-lib/lib/validators/validator";
import {IPrayerManager} from "@dpanet/prayers-lib/lib/managers/interface.manager";
import * as prayer from "@dpanet/prayers-lib/lib/entities/prayer";
import Joi = require('@hapi/joi');
import ramda from "ramda";
export class PrayerMangerValidator extends validators.Validator<IPrayerManager>
{

    private _prayerManagerSchema: object;
    private _adjustmentsSchema: object;
    private constructor() 
    {
       super("PrayerManagerValidator");
       this.setSchema();

    }
    private setSchema(): void {

        this._prayerManagerSchema = Joi.any().empty();
    }
    public validate(validateObject: IPrayerManager): boolean {
        return  super.genericValidator(() => Joi.validate(validateObject, this._prayerManagerSchema, { abortEarly: false, allowUnknown: true }));
    }
    public static createValidator(): validators.IValid<IPrayerManager> {
        return new PrayerMangerValidator();
    }
}
export * from  "@dpanet/prayers-lib/lib/validators/validator";
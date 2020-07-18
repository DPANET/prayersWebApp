import * as validators from  "@dpanet/prayers-lib/lib/validators/interface.validators.js";
import {IPrayerManager} from "@dpanet/prayers-lib/lib/managers/interface.manager.js";
import {IUser} from "../users/users.interface.js"
//import * as prayer from "@dpanet/prayers-lib/lib/entities/prayer";
import Joi from '@hapi/joi';
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

        this._prayerManagerSchema = Joi.any()
        .required()
        .label("Prayer Manager")
        .error(this.processErrorMessage);
    }
    public validate(validateObject: IPrayerManager): boolean {
        return  super.genericValidator( Joi.validate(validateObject, this._prayerManagerSchema, { abortEarly: false, allowUnknown: true }));
    }
    public static createValidator(): validators.IValid<IPrayerManager> {
        return new PrayerMangerValidator();
    }
}

export class UserValidator extends validators.Validator<IUser>
{

    private _userSchema: object;
    private constructor() 
    {
       super("UserValidator");
       this.setSchema();

    }
    private setSchema(): void {

        this._userSchema = Joi.object({
            username: Joi.string().alphanum().min(3).max(16).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required()
        }).with('username', 'password');
    }
    public validate(validateObject: IUser): boolean {
        return  super.genericValidator( Joi.validate(validateObject, this._userSchema, { abortEarly: false, allowUnknown: true }));
    }
    public static createValidator(): validators.IValid<IUser> {
        return new UserValidator();
    }
}
export * from  "@dpanet/prayers-lib/lib/validators/interface.validators";
export * from "@dpanet/prayers-lib/lib/validators/validator";
import * as validators from "@dpanet/prayers-lib/lib/validators/interface.validators";
import { IPrayerManager } from "@dpanet/prayers-lib/lib/managers/interface.manager";
import { IUser } from "../users/users.interface";
export declare class PrayerMangerValidator extends validators.Validator<IPrayerManager> {
    private _prayerManagerSchema;
    private _adjustmentsSchema;
    private constructor();
    private setSchema;
    validate(validateObject: IPrayerManager): boolean;
    static createValidator(): validators.IValid<IPrayerManager>;
}
export declare class UserValidator extends validators.Validator<IUser> {
    private _userSchema;
    private constructor();
    private setSchema;
    validate(validateObject: IUser): boolean;
    static createValidator(): validators.IValid<IUser>;
}
export * from "@dpanet/prayers-lib/lib/validators/interface.validators";
export * from "@dpanet/prayers-lib/lib/validators/validator";

import { validators } from "@dpanet/prayers-lib/lib/validators/validator";
import { IPrayerManager } from "@dpanet/prayers-lib/lib/managers/interface.manager";
export declare class PrayerMangerValidator extends validators.Validator<IPrayerManager> {
    private _configSchema;
    private _adjustmentsSchema;
    private constructor();
    private setSchema;
    validate(validateObject: IPrayerManager): boolean;
    static createValidator(): validators.IValid<IPrayerManager>;
}

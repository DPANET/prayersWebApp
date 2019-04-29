"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function buildObject() {
    try {
        $("#submit-button").on("click", () => {
            $.ajax({ url: "PrayerManager/PrayersAdjustments/", success: (result) => {
                    loadPrayerAdjustments(result);
                } });
        });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function loadPrayerAdjustments(prayerAdjustment) {
    prayerAdjustment.forEach(element => {
        switch (element.prayerName) {
            case "Fajr":
                $("#fajr-time").val(element.adjustments);
                break;
            case "Dhuhr":
                $("#dhur-time").val(element.adjustments);
                break;
            case "Asr":
                $("#asr-time").val(element.adjustments);
                break;
            case "Maghrib":
                $("#maghrib-time").val(element.adjustments);
                break;
            case "Isha":
                $("#isha-time").val(element.adjustments);
                break;
        }
    });
}
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;
//     return _db = await lowdb(new lowdbfile(_fileName));
// }

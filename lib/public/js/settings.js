"use strict";
// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import daterangepicker from "daterangepicker";
const moment_1 = __importDefault(require("moment"));
const $ = require("jquery");
const DataTable = require("datatables.net")(window, $);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, $);
async function buildObject() {
    try {
        setTimeout(() => {
            loadPrayerAdjustments();
            loadPrayerPrayerSettings();
        }, 5000);
        $("#view-button").on("click", loadDataTable);
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function loadDataTable() {
    $('#prayers-table').show(300);
    $.ajax({
        url: "PrayerManager/Prayers", success: (prayers) => {
            let prayersDataTable = getPrayerView(prayers);
            $('#prayers-table').DataTable({
                data: prayersDataTable,
                searching: false,
                paging: false,
                ordering: false,
                responsive: true,
                columns: [
                    { data: 'prayerDate', responsivePriority: 1 },
                    { data: 'fajr', responsivePriority: 2 },
                    { data: 'sunrise', responsivePriority: 9 },
                    { data: 'dhuhr', responsivePriority: 3 },
                    { data: 'asr', responsivePriority: 4 },
                    { data: 'sunrise', responsivePriority: 8 },
                    { data: 'maghrib', responsivePriority: 5 },
                    { data: 'isha', responsivePriority: 6 },
                    { data: 'midnight', responsivePriority: 7 }
                ]
            });
        }
    });
}
function getPrayerView(prayers) {
    let prayerView = new Array();
    let prayerTimings = new Array();
    prayers.forEach((curr, index, arr) => {
        curr.prayerTime.forEach((prayerTiming, i) => {
            prayerTimings.push(prayerTiming.prayerTime);
        });
        prayerView.push({
            prayerDate: moment_1.default(curr.prayersDate).format('L'),
            fajr: moment_1.default(prayerTimings[0]).format('LT'),
            sunrise: moment_1.default(prayerTimings[1]).format('LT'),
            dhuhr: moment_1.default(prayerTimings[2]).format('LT'),
            asr: moment_1.default(prayerTimings[3]).format('LT'),
            sunset: moment_1.default(prayerTimings[4]).format('LT'),
            maghrib: moment_1.default(prayerTimings[5]).format('LT'),
            isha: moment_1.default(prayerTimings[6]).format('LT'),
            midnight: moment_1.default(prayerTimings[7]).format('LT')
        });
    });
    return prayerView;
}
function loadPrayerPrayerSettings() {
    $.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings) => {
            $("#method").val(prayerSettings.method.id);
            $("#school").val(prayerSettings.school.id);
            $("#latitude").val(prayerSettings.latitudeAdjustment.id);
            $("#midnight").val(prayerSettings.midnight.id);
            $('input[name="daterange"]').daterangepicker({
                startDate: moment_1.default(prayerSettings.startDate),
                endDate: moment_1.default(prayerSettings.endDate)
            });
        }
    });
}
function loadPrayerAdjustments() {
    $.ajax({
        url: "PrayerManager/PrayersAdjustments/", success: (prayerAdjustment) => {
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
    });
}
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;
//     return _db = await lowdb(new lowdbfile(_fileName));
// }

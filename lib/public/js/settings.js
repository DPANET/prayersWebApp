"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
const jquery_1 = __importDefault(require("jquery"));
const prayerlib = __importStar(require("../../models/prayers.model"));
//import daterangepicker from "daterangepicker";
const moment_1 = __importDefault(require("moment"));
const DataTable = require("datatables.net")(window, jquery_1.default);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, jquery_1.default);
const DataTableRowGroup = require("datatables.net-rowgroup")(window, jquery_1.default);
async function buildObject() {
    try {
        //      setTimeout(() => {
        await jquery_1.default('document').ready(async () => {
            await loadPrayerAdjustments();
            await loadPrayerPrayerSettings();
            //await loadDataTable();
            jquery_1.default("#view-button").on("click", refreshDataTable);
            //        $("#view-button").on("click", refreshParams);
            //             refreshParams();
            //$("#submit-button").on("click",saveDataTable);
        });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function refreshParams() {
    let prayerAdjustment = new Array();
    prayerAdjustment.push({ prayerName: prayerlib.PrayersName.FAJR, adjustments: jquery_1.default("#fajr-time").val() }, { prayerName: prayerlib.PrayersName.DHUHR, adjustments: jquery_1.default("#dhur-time").val() }, { prayerName: prayerlib.PrayersName.ASR, adjustments: jquery_1.default("#asr-time").val() }, { prayerName: prayerlib.PrayersName.MAGHRIB, adjustments: jquery_1.default("#maghrib-time").val() }, { prayerName: prayerlib.PrayersName.ISHA, adjustments: jquery_1.default("#isha-time").val() });
    let prayersConfig = {
        method: jquery_1.default("#method").val(),
        school: jquery_1.default("#school").val(),
        latitudeAdjustment: jquery_1.default("#latitude").val(),
        midnight: jquery_1.default("#midnight").val(),
        adjustments: prayerAdjustment,
        startDate: jquery_1.default("#prayer-time-period").data('daterangepicker').startDate.toDate(),
        endDate: jquery_1.default("#prayer-time-period").data('daterangepicker').endDate.toDate()
    };
    return prayersConfig;
}
async function refreshDataTable() {
    if (jquery_1.default('#prayers-table-mobile').is(':hidden')) {
        await loadDataTable();
        jquery_1.default('#prayers-table-mobile').show();
    }
    else {
        jquery_1.default('#prayers-table-mobile').DataTable().ajax.reload();
    }
}
async function loadDataTable() {
    await jquery_1.default('#prayers-table-mobile').DataTable({
        ajax: {
            url: 'PrayerManager/PrayersViewMobile',
            type: 'GET',
            data: (d) => {
                return refreshParams();
            },
            dataSrc: (d) => { return d; }
        },
        autoWidth: false,
        searching: false,
        paging: false,
        ordering: false,
        responsive: true,
        rowGroup: {
            dataSrc: 'prayerDate'
        },
        columns: [
            { data: 'prayerName', responsivePriority: 2, className: "th" },
            { data: 'prayerTime', responsivePriority: 3, className: "th" }
        ]
    });
}
async function loadPrayerPrayerSettings() {
    await jquery_1.default.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings) => {
            jquery_1.default("#method").val(prayerSettings.method.id);
            jquery_1.default("#school").val(prayerSettings.school.id);
            jquery_1.default("#latitude").val(prayerSettings.latitudeAdjustment.id);
            jquery_1.default("#midnight").val(prayerSettings.midnight.id);
            jquery_1.default('input[name="daterangepicker"]').daterangepicker({
                startDate: moment_1.default(prayerSettings.startDate),
                endDate: moment_1.default(prayerSettings.endDate)
            });
        }
    });
}
async function loadPrayerAdjustments() {
    await jquery_1.default.ajax({
        url: "PrayerManager/PrayersAdjustments/", success: (prayerAdjustment) => {
            prayerAdjustment.forEach(element => {
                switch (element.prayerName) {
                    case "Fajr":
                        jquery_1.default("#fajr-time").val(element.adjustments);
                        break;
                    case "Dhuhr":
                        jquery_1.default("#dhur-time").val(element.adjustments);
                        break;
                    case "Asr":
                        jquery_1.default("#asr-time").val(element.adjustments);
                        break;
                    case "Maghrib":
                        jquery_1.default("#maghrib-time").val(element.adjustments);
                        break;
                    case "Isha":
                        jquery_1.default("#isha-time").val(element.adjustments);
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
//# sourceMappingURL=settings.js.map
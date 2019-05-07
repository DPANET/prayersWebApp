"use strict";
// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
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
const prayerlib = __importStar(require("../../models/prayers.model"));
//import daterangepicker from "daterangepicker";
const moment_1 = __importDefault(require("moment"));
const jquery_1 = __importDefault(require("jquery"));
const DataTable = require("datatables.net")(window, jquery_1.default);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, jquery_1.default);
const DataTableRowGroup = require("datatables.net-rowgroup")(window, jquery_1.default);
async function buildObject() {
    try {
        //      setTimeout(() => {
        jquery_1.default('document').ready(() => {
            loadPrayerAdjustments();
            loadPrayerPrayerSettings();
            loadDataTable();
            jquery_1.default("#view-button").on("click", refreshDataTable);
            //  refreshParams();
            //$("#submit-button").on("click",saveDataTable);
        });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function refreshParams() {
    let prayersConfig;
    //     prayersConfig.method =$("#method").val() ;
    //     prayersConfig.school = $("#school").val(); 
    //     prayersConfig.latitudeAdjustment = $("#latitude").val();
    //     prayersConfig.midnight= $("#midnight").val();
    prayersConfig.adjustments.push({ prayerName: prayerlib.PrayersName.FAJR, adjustments: jquery_1.default("#fajr-time").val() }, { prayerName: prayerlib.PrayersName.DHUHR, adjustments: jquery_1.default("#dhur-time").val() }, { prayerName: prayerlib.PrayersName.ASR, adjustments: jquery_1.default("#asr-time").val() }, { prayerName: prayerlib.PrayersName.MAGHRIB, adjustments: jquery_1.default("#maghrib-time").val() }, { prayerName: prayerlib.PrayersName.ISHA, adjustments: jquery_1.default("#isha-time").val() });
    return prayersConfig;
}
function refreshDataTable() {
    if (jquery_1.default('#prayers-table-mobile').is(':hidden'))
        jquery_1.default('#prayers-table-mobile').show();
    jquery_1.default('#prayers-table-mobile').DataTable().ajax.reload();
}
function loadDataTable() {
    jquery_1.default('#prayers-table-mobile').DataTable({
        ajax: {
            url: 'PrayerManager/PrayersViewMobile',
            type: 'GET',
            // data:(d)=>{
            //     return refreshParams();
            // },
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
function loadPrayerPrayerSettings() {
    jquery_1.default.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings) => {
            jquery_1.default("#method").val(prayerSettings.method.id);
            jquery_1.default("#school").val(prayerSettings.school.id);
            jquery_1.default("#latitude").val(prayerSettings.latitudeAdjustment.id);
            jquery_1.default("#midnight").val(prayerSettings.midnight.id);
            jquery_1.default('input[name="daterange"]').daterangepicker({
                startDate: moment_1.default(prayerSettings.startDate),
                endDate: moment_1.default(prayerSettings.endDate)
            });
        }
    });
}
function loadPrayerAdjustments() {
    jquery_1.default.ajax({
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

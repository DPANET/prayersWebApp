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
// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
const $ = require("jquery");
const prayerlib = __importStar(require("../../models/prayers.model"));
//import daterangepicker from "daterangepicker";
const moment_1 = __importDefault(require("moment"));
const prayers_lib_1 = require("@dpanet/prayers-lib");
const DataTable = require("datatables.net")(window, $);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, $);
const DataTableRowGroup = require("datatables.net-rowgroup")(window, $);
const noty_1 = __importDefault(require("noty"));
async function buildObject() {
    let noty;
    try {
        //      setTimeout(() => {
        await $('document').ready(async () => {
            await loadPrayerAdjustments();
            await loadPrayerPrayerSettings();
            noty = loadNotification();
            $("#view-button").on("click", refreshDataTable);
        });
    }
    catch (err) {
        //    alert(err);
        noty.setText("Error", err.message);
        noty.show();
    }
}
exports.buildObject = buildObject;
function loadNotification() {
    return new noty_1.default({
        layout: 'top',
        theme: "bootstrap-v4",
        type: 'error',
        text: '',
        force: false,
        timeout: false,
        progressBar: false,
        animation: {
            open: "noty_effects_open",
            close: "noty_effects_close",
        },
        closeWith: ['click'],
        modal: false,
        killer: false,
    });
}
function refreshParams() {
    let prayerAdjustment = new Array();
    prayerAdjustment.push({ prayerName: prayerlib.PrayersName.FAJR, adjustments: $("#fajr-time").val() }, { prayerName: prayerlib.PrayersName.DHUHR, adjustments: $("#dhur-time").val() }, { prayerName: prayerlib.PrayersName.ASR, adjustments: $("#asr-time").val() }, { prayerName: prayerlib.PrayersName.MAGHRIB, adjustments: $("#maghrib-time").val() }, { prayerName: prayerlib.PrayersName.ISHA, adjustments: $("#isha-time").val() });
    let prayersConfig = {
        method: $("#method").val(),
        school: $("#school").val(),
        latitudeAdjustment: $("#latitude").val(),
        midnight: $("#midnight").val(),
        adjustments: prayerAdjustment,
        adjustmentMethod: prayers_lib_1.AdjsutmentMethod.Server,
        startDate: $("#prayer-time-period").data('daterangepicker').startDate.toDate(),
        endDate: $("#prayer-time-period").data('daterangepicker').endDate.toDate()
    };
    return prayersConfig;
}
async function refreshDataTable() {
    if ($('#prayers-table-mobile').is(':hidden')) {
        await loadDataTable();
        $('#prayers-table-mobile').show();
    }
    else {
        $('#prayers-table-mobile').DataTable().ajax.reload();
    }
}
async function loadDataTable() {
    await $('#prayers-table-mobile').DataTable({
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
        paging: true,
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
    await $.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings) => {
            $("#method").val(prayerSettings.method.id);
            $("#school").val(prayerSettings.school.id);
            $("#latitude").val(prayerSettings.latitudeAdjustment.id);
            $("#midnight").val(prayerSettings.midnight.id);
            $('input[name="daterangepicker"]').daterangepicker({
                startDate: moment_1.default(prayerSettings.startDate),
                endDate: moment_1.default(prayerSettings.endDate)
            });
        }
    });
}
async function loadPrayerAdjustments() {
    await $.ajax({
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
//# sourceMappingURL=settings.js.map
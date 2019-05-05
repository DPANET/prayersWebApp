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
const DataTableRowGroup = require("datatables.net-rowgroup")(window, $);
async function buildObject() {
    try {
        //      setTimeout(() => {
        $('document').ready(() => {
            loadPrayerAdjustments();
            loadPrayerPrayerSettings();
            loadDataTable();
            $("#view-button").on("click", refreshDataTable);
        });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function refreshDataTable() {
    $('#prayers-table-mobile').show();
    $('#prayers-table-mobile').DataTable().ajax.reload();
}
function loadDataTable() {
    $('#prayers-table-mobile').DataTable({
        ajax: {
            url: 'PrayerManager/PrayersViewMobile',
            dataSrc: (d) => { return d; }
        },
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

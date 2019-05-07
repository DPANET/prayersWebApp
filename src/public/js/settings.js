"use strict";
// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var prayerlib = require("../../models/prayers.model");
//import daterangepicker from "daterangepicker";
var moment_1 = require("moment");
var jquery_1 = require("jquery");
var DataTable = require("datatables.net")(window, jquery_1["default"]);
var daterangepicker = require("daterangepicker");
var DataTableResp = require("datatables.net-responsive")(window, jquery_1["default"]);
var DataTableRowGroup = require("datatables.net-rowgroup")(window, jquery_1["default"]);
function buildObject() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                //      setTimeout(() => {
                jquery_1["default"]('document').ready(function () {
                    loadPrayerAdjustments();
                    loadPrayerPrayerSettings();
                    loadDataTable();
                    jquery_1["default"]("#view-button").on("click", refreshDataTable);
                    //  refreshParams();
                    //$("#submit-button").on("click",saveDataTable);
                });
            }
            catch (err) {
                alert(err);
            }
            return [2 /*return*/];
        });
    });
}
exports.buildObject = buildObject;
function refreshParams() {
    var prayersConfig;
    //     prayersConfig.method =$("#method").val() ;
    //     prayersConfig.school = $("#school").val(); 
    //     prayersConfig.latitudeAdjustment = $("#latitude").val();
    //     prayersConfig.midnight= $("#midnight").val();
    prayersConfig.adjustments.push({ prayerName: prayerlib.PrayersName.FAJR, adjustments: jquery_1["default"]("#fajr-time").val() }, { prayerName: prayerlib.PrayersName.DHUHR, adjustments: jquery_1["default"]("#dhur-time").val() }, { prayerName: prayerlib.PrayersName.ASR, adjustments: jquery_1["default"]("#asr-time").val() }, { prayerName: prayerlib.PrayersName.MAGHRIB, adjustments: jquery_1["default"]("#maghrib-time").val() }, { prayerName: prayerlib.PrayersName.ISHA, adjustments: jquery_1["default"]("#isha-time").val() });
    return prayersConfig;
}
function refreshDataTable() {
    if (jquery_1["default"]('#prayers-table-mobile').is(':hidden'))
        jquery_1["default"]('#prayers-table-mobile').show();
    jquery_1["default"]('#prayers-table-mobile').DataTable().ajax.reload();
}
function loadDataTable() {
    jquery_1["default"]('#prayers-table-mobile').DataTable({
        ajax: {
            url: 'PrayerManager/PrayersViewMobile',
            type: 'GET',
            // data:(d)=>{
            //     return refreshParams();
            // },
            dataSrc: function (d) { return d; }
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
    jquery_1["default"].ajax({
        url: "PrayerManager/PrayersSettings", success: function (prayerSettings) {
            jquery_1["default"]("#method").val(prayerSettings.method.id);
            jquery_1["default"]("#school").val(prayerSettings.school.id);
            jquery_1["default"]("#latitude").val(prayerSettings.latitudeAdjustment.id);
            jquery_1["default"]("#midnight").val(prayerSettings.midnight.id);
            jquery_1["default"]('input[name="daterange"]').daterangepicker({
                startDate: moment_1["default"](prayerSettings.startDate),
                endDate: moment_1["default"](prayerSettings.endDate)
            });
        }
    });
}
function loadPrayerAdjustments() {
    jquery_1["default"].ajax({
        url: "PrayerManager/PrayersAdjustments/", success: function (prayerAdjustment) {
            prayerAdjustment.forEach(function (element) {
                switch (element.prayerName) {
                    case "Fajr":
                        jquery_1["default"]("#fajr-time").val(element.adjustments);
                        break;
                    case "Dhuhr":
                        jquery_1["default"]("#dhur-time").val(element.adjustments);
                        break;
                    case "Asr":
                        jquery_1["default"]("#asr-time").val(element.adjustments);
                        break;
                    case "Maghrib":
                        jquery_1["default"]("#maghrib-time").val(element.adjustments);
                        break;
                    case "Isha":
                        jquery_1["default"]("#isha-time").val(element.adjustments);
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

import $ = require('jquery');
import * as prayerlib from "../../models/prayers.model";
import moment from "moment";
import Noty from "noty";
import { isNullOrUndefined } from 'util';
const DataTable = require("datatables.net")(window, $);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, $);
const DataTableRowGroup = require("datatables.net-rowgroup")(window, $);
export async function buildObject() {
    let noty: Noty;

    await $('document').ready(async () => {
        try {
            await loadPrayerPrayerSettings();
            await loadPrayerAdjustments();
            $("#view-button").on("click", refreshDataTable);
            $("#submit-button").on("click", saveDataTable);
        }
        catch (err) {
            let noty: Noty = loadNotification();
            noty.setText(err.message, true);
            noty.show();
        }

    }
    );
}

function notify(type: Noty.Type, message: string) {
    let noty: Noty = loadNotification();
    noty.setType(type,true);
    noty.setText(message, true);
 
    noty.show();
}
function loadNotification(): Noty {
    return new Noty({
        layout: 'top',
        theme: "bootstrap-v4",
        type: "error", // success, error, warning, information, notification
        text: 'Test Hi', // [string|html] can be HTML or STRING
        force: false, // [boolean] adds notification to the beginning of queue when set to true      
        timeout: false, // [integer|boolean] delay for closing event in milliseconds. Set false for sticky notifications
        progressBar: false, // [boolean] - displays a progress bar
        animation: {
            open: 'animated slideInDown', // Animate.css class names
            close: 'animated slideOutUp' // Animate.css class names
        },
        closeWith: ['click', 'button'], // ['click', 'button', 'hover', 'backdrop'] // backdrop click will close all notifications
        modal: false, // [boolean] if true adds an overlay
        killer: true, // [boolean] if true closes all notifications and shows itself
    });
}
function refreshPrayerConfigForm(): prayerlib.IPrayersConfig {
    let prayerAdjustment: prayerlib.IPrayerAdjustments[] = new Array<prayerlib.IPrayerAdjustments>();
    prayerAdjustment.push(
        { prayerName: prayerlib.PrayersName.FAJR, adjustments: $("#fajr-time").val() as number },
        { prayerName: prayerlib.PrayersName.DHUHR, adjustments: $("#dhur-time").val() as number },
        { prayerName: prayerlib.PrayersName.ASR, adjustments: $("#asr-time").val() as number },
        { prayerName: prayerlib.PrayersName.MAGHRIB, adjustments: $("#maghrib-time").val() as number },
        { prayerName: prayerlib.PrayersName.ISHA, adjustments: $("#isha-time").val() as number },
    );
    let prayersConfig: prayerlib.IPrayersConfig = {
        method: $("#method").val() as prayerlib.Methods,
        school: $("#school").val() as prayerlib.Schools,
        latitudeAdjustment: $("#latitude").val() as prayerlib.LatitudeMethod,
        midnight: $("#midnight").val() as prayerlib.MidnightMode,
        adjustments: prayerAdjustment,
        adjustmentMethod: prayerlib.AdjsutmentMethod.Server,
        startDate: $("#prayer-time-period").data('daterangepicker').startDate.toDate(),
        endDate: $("#prayer-time-period").data('daterangepicker').endDate.toDate()
    }
    return prayersConfig;
}
function validateForm(prayersConfig: prayerlib.IPrayersConfig): boolean {

    let validator: prayerlib.IValid<prayerlib.IPrayersConfig> = prayerlib.ConfigValidator.createValidator();
    let result: boolean = validator.validate(prayersConfig);
    if (result)
        return result;
    else {
        let err: prayerlib.IValidationError = validator.getValidationError();
        let message: string[] = err.details.map((detail: any) => `${detail.value.label} with value ${detail.value.value}: ${detail.message}`);
        let messageShort = message.reduce((prvs, curr, index, array) => prvs.concat('<br>', curr));
        throw new Error(messageShort);
    }
}
async function refreshDataTable() {
    try {
        if ($('#prayers-table-mobile').is(':hidden')) {
            await loadDataTable();
            $('#prayers-table-mobile').show();
        }
        else {
            let prayersConfig: prayerlib.IPrayersConfig = refreshPrayerConfigForm();
            let result: boolean = validateForm(prayersConfig);
            if (result)
                await $('#prayers-table-mobile').DataTable().ajax.reload();
        }
    } catch (err) {
        let noty: Noty = loadNotification();
        noty.setText(err.message, true);
        noty.show();
    }
}
async function saveDataTable() {
    try {
        let prayersConfig: prayerlib.IPrayersConfig = refreshPrayerConfigForm();
        let result: boolean = validateForm(prayersConfig);
        if (result) {
             $.ajax({
                url: 'PrayerManager/PrayersViewMobile', type: "POST",
                data: JSON.stringify(prayersConfig),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
               // error: genericErrorHandler,
                success: () => notify("success", "Configuration is saved")
            }).catch((jqXHR: JQueryXHR, textStatus: string, errorThrown: string)=>genericErrorHandler(jqXHR,textStatus,errorThrown));
            
        }
    }
    catch (err) {
        let noty: Noty = loadNotification();
        noty.setText(err.message, true);
        noty.show();
    }
}
async function loadDataTable() {
    $.fn.dataTable.ext.errMode = 'throw';
    await $('#prayers-table-mobile').DataTable(
        {
            ajax: {
                url: 'PrayerManager/PrayersViewMobile',
                type: 'GET',
                data: (d) => {
                    try {
                        return refreshPrayerConfigForm();
                    }
                    catch (err) {
                        notify("error", err.message);
                    }
                },
                error: dataRefreshErrorHandler,
                dataSrc: (d) => { return d; }
            },
            autoWidth: false,
            searching: false,
            paging: true,
            ordering: false,
            responsive: true,
            language: {
                loadingRecords: "Loading...",
                processing: "Processing...",
                zeroRecords: "No records to display",
                emptyTable: "No data available in table"
            },
            rowGroup:
            {
                dataSrc: 'prayerDate'
            },
            columns: [
                { data: 'prayerName', responsivePriority: 2, className: "th" },
                { data: 'prayerTime', responsivePriority: 3, className: "th" }
            ]
        }
    );
}
async function dataRefreshErrorHandler(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
    if (jqXHR.status >= 400 && !isNullOrUndefined(jqXHR.responseJSON.message))
        notify("error", jqXHR.responseJSON.message);
    else
        notify("error", errorThrown);
    $('#prayers-table-mobile').DataTable().clear().draw();
}
async function genericErrorHandler(jqXHR: JQueryXHR, textStatus: string, errorThrown: string) {
    if (jqXHR.status >= 400 && !isNullOrUndefined(jqXHR.responseJSON.message))
    notify("error", jqXHR.responseJSON.message);
    else
    notify("error", errorThrown);
}
async function loadPrayerPrayerSettings() {
    await $.ajax({
        url: "PrayerManager/PrayersSettings",
        error: genericErrorHandler,
        success: (prayerSettings: prayerlib.IPrayersSettings) => {
            $("#method").val(prayerSettings.method.id);
            $("#school").val(prayerSettings.school.id);
            $("#latitude").val(prayerSettings.latitudeAdjustment.id);
            $("#midnight").val(prayerSettings.midnight.id);
            $('input[name="daterangepicker"]').daterangepicker(
                {
                    startDate: moment(prayerSettings.startDate),
                    endDate: moment(prayerSettings.endDate)
                }
            )
        },
    });
}
async function loadPrayerAdjustments() {
    await $.ajax({
        url: "PrayerManager/PrayersAdjustments/",
        error: genericErrorHandler,
        success: (prayerAdjustment: prayerlib.IPrayerAdjustments[]) => {
            prayerAdjustment.forEach(element => {
                switch (element.prayerName) {
                    case "Fajr": $("#fajr-time").val(element.adjustments);
                        break;
                    case "Dhuhr": $("#dhur-time").val(element.adjustments);
                        break;
                    case "Asr": $("#asr-time").val(element.adjustments);
                        break;
                    case "Maghrib": $("#maghrib-time").val(element.adjustments);
                        break;
                    case "Isha": $("#isha-time").val(element.adjustments);
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


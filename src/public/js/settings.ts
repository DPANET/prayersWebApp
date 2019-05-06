// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');

import * as prayerlib from "../../models/prayers.model";
//import daterangepicker from "daterangepicker";
import moment from "moment";
import $ from 'jquery';

const DataTable = require("datatables.net")(window, $);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, $);
const DataTableRowGroup = require("datatables.net-rowgroup")(window, $);

export async function buildObject() {
    try {

        //      setTimeout(() => {
        $('document').ready(() => {
            loadPrayerAdjustments();
            loadPrayerPrayerSettings();
            loadDataTable();
            $("#view-button").on("click", refreshDataTable);
          //  refreshParams();
            //$("#submit-button").on("click",saveDataTable);
        }
        );

    }
    catch (err) {
        alert(err);
    }
}
function refreshParams():any
{
    let prayersConfig:any;
    //     prayersConfig.method =$("#method").val() ;
    //     prayersConfig.school = $("#school").val(); 
    //     prayersConfig.latitudeAdjustment = $("#latitude").val();
    //     prayersConfig.midnight= $("#midnight").val();
        prayersConfig.adjustments.push (
        {prayerName:prayerlib.PrayersName.FAJR, adjustments: $("#fajr-time").val()as number },
        {prayerName:prayerlib.PrayersName.DHUHR, adjustments: $("#dhur-time").val()as number },
        {prayerName:prayerlib.PrayersName.ASR, adjustments: $("#asr-time").val()as number },
        {prayerName:prayerlib.PrayersName.MAGHRIB, adjustments: $("#maghrib-time").val()as number },
        {prayerName:prayerlib.PrayersName.ISHA, adjustments: $("#isha-time").val()as number },
        );
    return prayersConfig;
        
}
function refreshDataTable() {
    if($('#prayers-table-mobile').is(':hidden'))
    $('#prayers-table-mobile').show();
    $('#prayers-table-mobile').DataTable().ajax.reload();
}
function loadDataTable() {

    $('#prayers-table-mobile').DataTable(
        {
            ajax: {
                url: 'PrayerManager/PrayersViewMobile',
                type: 'GET',
                // data:(d)=>{
                //     return refreshParams();
                // },
                dataSrc: (d)=>{return d;}
            },
            autoWidth: false,
            searching: false,
            paging: false,
            ordering: false,
            responsive: true,
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


function loadPrayerPrayerSettings() {
    $.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings: prayerlib.IPrayersSettings) => {
            $("#method").val(prayerSettings.method.id);
            $("#school").val(prayerSettings.school.id);
            $("#latitude").val(prayerSettings.latitudeAdjustment.id);
            $("#midnight").val(prayerSettings.midnight.id);
            $('input[name="daterange"]').daterangepicker(
                {
                    startDate: moment(prayerSettings.startDate),
                    endDate: moment(prayerSettings.endDate)
                }
            )
        }
    });
}
function loadPrayerAdjustments() {

    $.ajax({
        url: "PrayerManager/PrayersAdjustments/", success: (prayerAdjustment: prayerlib.IPrayerAdjustments[]) => {

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


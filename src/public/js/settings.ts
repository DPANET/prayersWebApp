// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
import $ from 'jquery';
import * as prayerlib from "../../models/prayers.model";
//import daterangepicker from "daterangepicker";
import moment from "moment";
import { IPrayersConfig, PrayerAdjustment, AdjsutmentMethod } from "@dpanet/prayers-lib";


const DataTable = require("datatables.net")(window, $);
const daterangepicker =require( "daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, $);
const DataTableRowGroup = require("datatables.net-rowgroup")(window, $);

export async function buildObject() {
    try {

        //      setTimeout(() => {
       await $('document').ready(async () => {
            await loadPrayerAdjustments();
            await loadPrayerPrayerSettings();
            //await loadDataTable();
            $("#view-button").on("click", refreshDataTable);
    //        $("#view-button").on("click", refreshParams);
//             refreshParams();
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
    let prayerAdjustment:prayerlib.IPrayerAdjustments[]= new Array<prayerlib.IPrayerAdjustments>();
    prayerAdjustment.push (
        {prayerName:prayerlib.PrayersName.FAJR, adjustments: $("#fajr-time").val() as number  },
        {prayerName:prayerlib.PrayersName.DHUHR, adjustments: $("#dhur-time").val()as number },
        {prayerName:prayerlib.PrayersName.ASR, adjustments: $("#asr-time").val()as number},
        {prayerName:prayerlib.PrayersName.MAGHRIB, adjustments: $("#maghrib-time").val()as number},
        {prayerName:prayerlib.PrayersName.ISHA, adjustments: $("#isha-time").val()as number},
        );

    let prayersConfig:IPrayersConfig = {
    
        method :$("#method").val() as prayerlib.Methods,
        school : $("#school").val() as prayerlib.Schools,
        latitudeAdjustment : $("#latitude").val()as prayerlib.LatitudeMethod,
        midnight:$("#midnight").val() as prayerlib.MidnightMode,
        adjustments: prayerAdjustment,
        adjustmentMethod: AdjsutmentMethod.Server,
        startDate :$("#prayer-time-period").data('daterangepicker').startDate.toDate(),
        endDate:$("#prayer-time-period").data('daterangepicker').endDate.toDate()

    }
    return prayersConfig;
        
}
async function refreshDataTable() {
    if($('#prayers-table-mobile').is(':hidden'))
    {
        await loadDataTable();
        $('#prayers-table-mobile').show();
    }
    else{
         $('#prayers-table-mobile').DataTable().ajax.reload();
    }

}
async function  loadDataTable() {

  await  $('#prayers-table-mobile').DataTable(
        {
            ajax: {
                url: 'PrayerManager/PrayersViewMobile',
                type: 'GET',
                data:(d)=>{
                    
                    return refreshParams();
                },
                dataSrc: (d)=>{return d;}
            },
            autoWidth: false,
            searching: false,
            paging: true,
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


async function loadPrayerPrayerSettings() {
 await   $.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings: prayerlib.IPrayersSettings) => {
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
        }
    });
}
async function loadPrayerAdjustments() {

 await   $.ajax({
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


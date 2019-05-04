// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');

import * as prayerlib from "../../models/prayers.model";
//import daterangepicker from "daterangepicker";
import moment from "moment";
const  $  =require( 'jquery');
const DataTable = require("datatables.net")(window, $);
const daterangepicker = require("daterangepicker");
const DataTableResp = require("datatables.net-responsive")(window, $);


interface IPrayersView {
    prayerDate: string,
    fajr: string,
    sunrise: string,
    dhuhr: string,
    asr: string,
    sunset: string,
    maghrib: string,
    isha: string,
    midnight: string
}
interface IPrayersViewRow {
    prayerDate: string,
    prayerTime: string,
    prayerName: prayerlib.PrayersName
}
export async function buildObject() {
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
function loadDataTable() {
    $('#prayers-table').show(300);

    $.ajax({
        url: "PrayerManager/Prayers", success: (prayers: prayerlib.IPrayers[]) => {
            let prayersDataTable: IPrayersView[] = getPrayerView(prayers);
        //   let prayerDataTableMobile: IPrayersViewRow[] = getPrayerViewRow(prayersDataTable);
          // console.log(prayerDataTableMobile);
            $('#prayers-table').DataTable(
                {
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
                }
            )
            // $('#prayers-table-mobile').DataTable(
            //     {
            //         data: prayerDataTableMobile,
            //         searching: false,
            //         paging: false,
            //         ordering: false,
            //         responsive: true,
            //         columns: [
            //             { data: 'Date' },
            //             { data: 'Prayer' },
            //             { data: 'Time' }
            //         ]
            //     }
            // )
}
    });
}
function getPrayerView(prayers: prayerlib.IPrayers[]): IPrayersView[] {
    let prayerView: Array<IPrayersView> = new Array<IPrayersView>();
    let prayerViewObject: IPrayersView;
    let prayerTimings: Date[] = new Array<Date>();
    prayers.forEach((curr, index, arr) => {
        curr.prayerTime.forEach((prayerTiming, i) => {
            prayerTimings.push(prayerTiming.prayerTime);
        });
        prayerViewObject =
            {
                prayerDate: moment(curr.prayersDate).format('L'),
                fajr: moment(prayerTimings[0]).format('LT'),
                sunrise: moment(prayerTimings[1]).format('LT'),
                dhuhr: moment(prayerTimings[2]).format('LT'),
                asr: moment(prayerTimings[3]).format('LT'),
                sunset: moment(prayerTimings[4]).format('LT'),
                maghrib: moment(prayerTimings[5]).format('LT'),
                isha: moment(prayerTimings[6]).format('LT'),
                midnight: moment(prayerTimings[7]).format('LT')
            };
        prayerView.push(prayerViewObject);
    }
    );
    return prayerView;
}
function getPrayerViewRow(prayersView: IPrayersView[]): IPrayersViewRow[] {
    let prayerViewRow: Array<IPrayersViewRow> = new Array<IPrayersViewRow>();
    prayersView.forEach((prayerViewObject, index, arr) => {
        prayerViewRow.concat([
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.FAJR, prayerTime: prayerViewObject.fajr },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.SUNRISE, prayerTime: prayerViewObject.sunrise },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.DHUHR, prayerTime: prayerViewObject.dhuhr },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.ASR, prayerTime: prayerViewObject.asr },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.SUNSET, prayerTime: prayerViewObject.sunset },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.MAGHRIB, prayerTime: prayerViewObject.maghrib },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.ISHA, prayerTime: prayerViewObject.isha },
            { prayerDate: prayerViewObject.prayerDate, prayerName: prayerlib.PrayersName.MIDNIGHT, prayerTime: prayerViewObject.midnight },
        ]);
    });

    return prayerViewRow;

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


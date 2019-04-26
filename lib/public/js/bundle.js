(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
// //import * as prayerlib from "@dpanet/prayers-lib";
// import lowdb from "lowdb";
// import lowdbfile from "lowdb/adapters/FileAsync";
// const to = require('await-to-js').default;
// import _ = require('lodash');
Object.defineProperty(exports, "__esModule", { value: true });
buildObject();
async function buildObject() {
    try {
        // let prayerConfig: prayerlib.IPrayersConfig = await new prayerlib.Configurator().getPrayerConfig();
        // let locationConfig: prayerlib.ILocationConfig = await new prayerlib.Configurator().getLocationConfig();
        // console.log(locationConfig);
        // let prayerManager: prayerlib.IPrayerManager = await prayerlib.PrayerTimeBuilder
        //     .createPrayerTimeBuilder(locationConfig, prayerConfig)
        //     .createPrayerTimeManager();
        // console.log(prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR));
        // //let config:prayerlib.IConfig   = new prayerlib.Configurator();
        // let fajrAdjustment:number  = prayerManager.getPrayerAdjustmentsByPrayer(prayerlib.PrayersName.FAJR).adjustments;
        // // console.log(fajrAdjustment);
        //  let err: Error, result: any;
        //  await getDB().then(result => result.get('config.prayerConfig.calculations').value());
        $("#fajr-time").val(2);
        $("#submit-button").on("click", () => { alert('Hi'); });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;
//     return _db = await lowdb(new lowdbfile(_fileName));
// }

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9wdWJsaWMvanMvYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbi8vIC8vaW1wb3J0ICogYXMgcHJheWVybGliIGZyb20gXCJAZHBhbmV0L3ByYXllcnMtbGliXCI7XHJcbi8vIGltcG9ydCBsb3dkYiBmcm9tIFwibG93ZGJcIjtcclxuLy8gaW1wb3J0IGxvd2RiZmlsZSBmcm9tIFwibG93ZGIvYWRhcHRlcnMvRmlsZUFzeW5jXCI7XHJcbi8vIGNvbnN0IHRvID0gcmVxdWlyZSgnYXdhaXQtdG8tanMnKS5kZWZhdWx0O1xyXG4vLyBpbXBvcnQgXyA9IHJlcXVpcmUoJ2xvZGFzaCcpO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmJ1aWxkT2JqZWN0KCk7XHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkT2JqZWN0KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBsZXQgcHJheWVyQ29uZmlnOiBwcmF5ZXJsaWIuSVByYXllcnNDb25maWcgPSBhd2FpdCBuZXcgcHJheWVybGliLkNvbmZpZ3VyYXRvcigpLmdldFByYXllckNvbmZpZygpO1xyXG4gICAgICAgIC8vIGxldCBsb2NhdGlvbkNvbmZpZzogcHJheWVybGliLklMb2NhdGlvbkNvbmZpZyA9IGF3YWl0IG5ldyBwcmF5ZXJsaWIuQ29uZmlndXJhdG9yKCkuZ2V0TG9jYXRpb25Db25maWcoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsb2NhdGlvbkNvbmZpZyk7XHJcbiAgICAgICAgLy8gbGV0IHByYXllck1hbmFnZXI6IHByYXllcmxpYi5JUHJheWVyTWFuYWdlciA9IGF3YWl0IHByYXllcmxpYi5QcmF5ZXJUaW1lQnVpbGRlclxyXG4gICAgICAgIC8vICAgICAuY3JlYXRlUHJheWVyVGltZUJ1aWxkZXIobG9jYXRpb25Db25maWcsIHByYXllckNvbmZpZylcclxuICAgICAgICAvLyAgICAgLmNyZWF0ZVByYXllclRpbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJheWVyTWFuYWdlci5nZXRQcmF5ZXJBZGp1c3RtZW50c0J5UHJheWVyKHByYXllcmxpYi5QcmF5ZXJzTmFtZS5GQUpSKSk7XHJcbiAgICAgICAgLy8gLy9sZXQgY29uZmlnOnByYXllcmxpYi5JQ29uZmlnICAgPSBuZXcgcHJheWVybGliLkNvbmZpZ3VyYXRvcigpO1xyXG4gICAgICAgIC8vIGxldCBmYWpyQWRqdXN0bWVudDpudW1iZXIgID0gcHJheWVyTWFuYWdlci5nZXRQcmF5ZXJBZGp1c3RtZW50c0J5UHJheWVyKHByYXllcmxpYi5QcmF5ZXJzTmFtZS5GQUpSKS5hZGp1c3RtZW50cztcclxuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhmYWpyQWRqdXN0bWVudCk7XHJcbiAgICAgICAgLy8gIGxldCBlcnI6IEVycm9yLCByZXN1bHQ6IGFueTtcclxuICAgICAgICAvLyAgYXdhaXQgZ2V0REIoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZ2V0KCdjb25maWcucHJheWVyQ29uZmlnLmNhbGN1bGF0aW9ucycpLnZhbHVlKCkpO1xyXG4gICAgICAgICQoXCIjZmFqci10aW1lXCIpLnZhbCgyKTtcclxuICAgICAgICAkKFwiI3N1Ym1pdC1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7IGFsZXJ0KCdIaScpOyB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBhbGVydChlcnIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYnVpbGRPYmplY3QgPSBidWlsZE9iamVjdDtcclxuLy8gIGFzeW5jIGZ1bmN0aW9uICBnZXREQigpOiBQcm9taXNlPGxvd2RiLkxvd2RiQXN5bmM8YW55Pj4ge1xyXG4vLyAgICAgbGV0IF9maWxlTmFtZTogc3RyaW5nID0gJ2NvbmZpZy9jb25maWcuanNvbic7ICBcclxuLy8gICAgIGxldCBfZGI6IGxvd2RiLkxvd2RiQXN5bmM8YW55PjtcclxuLy8gICAgIHJldHVybiBfZGIgPSBhd2FpdCBsb3dkYihuZXcgbG93ZGJmaWxlKF9maWxlTmFtZSkpO1xyXG4vLyB9XHJcbiJdfQ==

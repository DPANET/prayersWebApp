(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        $("#submit-button").on("click", () => {
            $.ajax({ url: "PrayerManager/PrayersAdjustments/", success: function (result) {
                    let prayerAdjustment = result;
                    $('fajr-time').val(prayerAdjustment[1].adjustments);
                    $('dhur-time').val(prayerAdjustment[2].adjustments);
                    alert($('fajr-time').val(prayerAdjustment[1].adjustments));
                } });
        });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;
//     return _db = await lowdb(new lowdbfile(_fileName));
// }

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9wdWJsaWMvanMvc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkT2JqZWN0KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAvLyBsZXQgcHJheWVyQ29uZmlnOiBwcmF5ZXJsaWIuSVByYXllcnNDb25maWcgPSBhd2FpdCBuZXcgcHJheWVybGliLkNvbmZpZ3VyYXRvcigpLmdldFByYXllckNvbmZpZygpO1xyXG4gICAgICAgIC8vIGxldCBsb2NhdGlvbkNvbmZpZzogcHJheWVybGliLklMb2NhdGlvbkNvbmZpZyA9IGF3YWl0IG5ldyBwcmF5ZXJsaWIuQ29uZmlndXJhdG9yKCkuZ2V0TG9jYXRpb25Db25maWcoKTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhsb2NhdGlvbkNvbmZpZyk7XHJcbiAgICAgICAgLy8gbGV0IHByYXllck1hbmFnZXI6IHByYXllcmxpYi5JUHJheWVyTWFuYWdlciA9IGF3YWl0IHByYXllcmxpYi5QcmF5ZXJUaW1lQnVpbGRlclxyXG4gICAgICAgIC8vICAgICAuY3JlYXRlUHJheWVyVGltZUJ1aWxkZXIobG9jYXRpb25Db25maWcsIHByYXllckNvbmZpZylcclxuICAgICAgICAvLyAgICAgLmNyZWF0ZVByYXllclRpbWVNYW5hZ2VyKCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2cocHJheWVyTWFuYWdlci5nZXRQcmF5ZXJBZGp1c3RtZW50c0J5UHJheWVyKHByYXllcmxpYi5QcmF5ZXJzTmFtZS5GQUpSKSk7XHJcbiAgICAgICAgLy8gLy9sZXQgY29uZmlnOnByYXllcmxpYi5JQ29uZmlnICAgPSBuZXcgcHJheWVybGliLkNvbmZpZ3VyYXRvcigpO1xyXG4gICAgICAgIC8vIGxldCBmYWpyQWRqdXN0bWVudDpudW1iZXIgID0gcHJheWVyTWFuYWdlci5nZXRQcmF5ZXJBZGp1c3RtZW50c0J5UHJheWVyKHByYXllcmxpYi5QcmF5ZXJzTmFtZS5GQUpSKS5hZGp1c3RtZW50cztcclxuICAgICAgICAvLyAvLyBjb25zb2xlLmxvZyhmYWpyQWRqdXN0bWVudCk7XHJcbiAgICAgICAgLy8gIGxldCBlcnI6IEVycm9yLCByZXN1bHQ6IGFueTtcclxuICAgICAgICAvLyAgYXdhaXQgZ2V0REIoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZ2V0KCdjb25maWcucHJheWVyQ29uZmlnLmNhbGN1bGF0aW9ucycpLnZhbHVlKCkpO1xyXG4gICAgICAgICQoXCIjc3VibWl0LWJ1dHRvblwiKS5vbihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgJC5hamF4KHsgdXJsOiBcIlByYXllck1hbmFnZXIvUHJheWVyc0FkanVzdG1lbnRzL1wiLCBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByYXllckFkanVzdG1lbnQgPSByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnZmFqci10aW1lJykudmFsKHByYXllckFkanVzdG1lbnRbMV0uYWRqdXN0bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2RodXItdGltZScpLnZhbChwcmF5ZXJBZGp1c3RtZW50WzJdLmFkanVzdG1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgkKCdmYWpyLXRpbWUnKS52YWwocHJheWVyQWRqdXN0bWVudFsxXS5hZGp1c3RtZW50cykpO1xyXG4gICAgICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBhbGVydChlcnIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYnVpbGRPYmplY3QgPSBidWlsZE9iamVjdDtcclxuYnVpbGRPYmplY3QoKTtcclxuLy8gIGFzeW5jIGZ1bmN0aW9uICBnZXREQigpOiBQcm9taXNlPGxvd2RiLkxvd2RiQXN5bmM8YW55Pj4ge1xyXG4vLyAgICAgbGV0IF9maWxlTmFtZTogc3RyaW5nID0gJ2NvbmZpZy9jb25maWcuanNvbic7ICBcclxuLy8gICAgIGxldCBfZGI6IGxvd2RiLkxvd2RiQXN5bmM8YW55PjtcclxuLy8gICAgIHJldHVybiBfZGIgPSBhd2FpdCBsb3dkYihuZXcgbG93ZGJmaWxlKF9maWxlTmFtZSkpO1xyXG4vLyB9XHJcbiJdfQ==

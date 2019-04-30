(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function buildObject() {
    try {
        setTimeout(() => {
            loadPrayerAdjustments();
            loadPrayerPrayerSettings();
        }, 5000);
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function loadPrayerPrayerSettings() {
    $.ajax({
        url: "PrayerManager/PrayersSettings", success: (prayerSettings) => {
            $("#method").val(prayerSettings.method.id);
            $("#school").val(prayerSettings.school.id);
            $("#latitude").val(prayerSettings.latitudeAdjustment.id);
            $("#midnight").val(prayerSettings.midnight.id);
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9wdWJsaWMvanMvc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuYXN5bmMgZnVuY3Rpb24gYnVpbGRPYmplY3QoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkUHJheWVyQWRqdXN0bWVudHMoKTtcclxuICAgICAgICAgICAgbG9hZFByYXllclByYXllclNldHRpbmdzKCk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyKSB7XHJcbiAgICAgICAgYWxlcnQoZXJyKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLmJ1aWxkT2JqZWN0ID0gYnVpbGRPYmplY3Q7XHJcbmZ1bmN0aW9uIGxvYWRQcmF5ZXJQcmF5ZXJTZXR0aW5ncygpIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiBcIlByYXllck1hbmFnZXIvUHJheWVyc1NldHRpbmdzXCIsIHN1Y2Nlc3M6IChwcmF5ZXJTZXR0aW5ncykgPT4ge1xyXG4gICAgICAgICAgICAkKFwiI21ldGhvZFwiKS52YWwocHJheWVyU2V0dGluZ3MubWV0aG9kLmlkKTtcclxuICAgICAgICAgICAgJChcIiNzY2hvb2xcIikudmFsKHByYXllclNldHRpbmdzLnNjaG9vbC5pZCk7XHJcbiAgICAgICAgICAgICQoXCIjbGF0aXR1ZGVcIikudmFsKHByYXllclNldHRpbmdzLmxhdGl0dWRlQWRqdXN0bWVudC5pZCk7XHJcbiAgICAgICAgICAgICQoXCIjbWlkbmlnaHRcIikudmFsKHByYXllclNldHRpbmdzLm1pZG5pZ2h0LmlkKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5mdW5jdGlvbiBsb2FkUHJheWVyQWRqdXN0bWVudHMoKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogXCJQcmF5ZXJNYW5hZ2VyL1ByYXllcnNBZGp1c3RtZW50cy9cIiwgc3VjY2VzczogKHByYXllckFkanVzdG1lbnQpID0+IHtcclxuICAgICAgICAgICAgcHJheWVyQWRqdXN0bWVudC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChlbGVtZW50LnByYXllck5hbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiRmFqclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2ZhanItdGltZVwiKS52YWwoZWxlbWVudC5hZGp1c3RtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJEaHVoclwiOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKFwiI2RodXItdGltZVwiKS52YWwoZWxlbWVudC5hZGp1c3RtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJBc3JcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNhc3ItdGltZVwiKS52YWwoZWxlbWVudC5hZGp1c3RtZW50cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJNYWdocmliXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbWFnaHJpYi10aW1lXCIpLnZhbChlbGVtZW50LmFkanVzdG1lbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIklzaGFcIjpcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNpc2hhLXRpbWVcIikudmFsKGVsZW1lbnQuYWRqdXN0bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuYnVpbGRPYmplY3QoKTtcclxuLy8gIGFzeW5jIGZ1bmN0aW9uICBnZXREQigpOiBQcm9taXNlPGxvd2RiLkxvd2RiQXN5bmM8YW55Pj4ge1xyXG4vLyAgICAgbGV0IF9maWxlTmFtZTogc3RyaW5nID0gJ2NvbmZpZy9jb25maWcuanNvbic7ICBcclxuLy8gICAgIGxldCBfZGI6IGxvd2RiLkxvd2RiQXN5bmM8YW55PjtcclxuLy8gICAgIHJldHVybiBfZGIgPSBhd2FpdCBsb3dkYihuZXcgbG93ZGJmaWxlKF9maWxlTmFtZSkpO1xyXG4vLyB9XHJcbiJdfQ==

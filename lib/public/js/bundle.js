(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function buildObject() {
    try {
        $("#submit-button").on("click", () => {
            $.ajax({ url: "PrayerManager/PrayersAdjustments/", success: (result) => {
                    loadPrayerAdjustments(result);
                } });
        });
    }
    catch (err) {
        alert(err);
    }
}
exports.buildObject = buildObject;
function loadPrayerAdjustments(prayerAdjustment) {
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
buildObject();
//  async function  getDB(): Promise<lowdb.LowdbAsync<any>> {
//     let _fileName: string = 'config/config.json';  
//     let _db: lowdb.LowdbAsync<any>;
//     return _db = await lowdb(new lowdbfile(_fileName));
// }

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL0FwcERhdGEvUm9hbWluZy9ucG0vbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9wdWJsaWMvanMvc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmFzeW5jIGZ1bmN0aW9uIGJ1aWxkT2JqZWN0KCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICAkKFwiI3N1Ym1pdC1idXR0b25cIikub24oXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICQuYWpheCh7IHVybDogXCJQcmF5ZXJNYW5hZ2VyL1ByYXllcnNBZGp1c3RtZW50cy9cIiwgc3VjY2VzczogKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvYWRQcmF5ZXJBZGp1c3RtZW50cyhyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnIpIHtcclxuICAgICAgICBhbGVydChlcnIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuYnVpbGRPYmplY3QgPSBidWlsZE9iamVjdDtcclxuZnVuY3Rpb24gbG9hZFByYXllckFkanVzdG1lbnRzKHByYXllckFkanVzdG1lbnQpIHtcclxuICAgIHByYXllckFkanVzdG1lbnQuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBzd2l0Y2ggKGVsZW1lbnQucHJheWVyTmFtZSkge1xyXG4gICAgICAgICAgICBjYXNlIFwiRmFqclwiOlxyXG4gICAgICAgICAgICAgICAgJChcIiNmYWpyLXRpbWVcIikudmFsKGVsZW1lbnQuYWRqdXN0bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJEaHVoclwiOlxyXG4gICAgICAgICAgICAgICAgJChcIiNkaHVyLXRpbWVcIikudmFsKGVsZW1lbnQuYWRqdXN0bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJBc3JcIjpcclxuICAgICAgICAgICAgICAgICQoXCIjYXNyLXRpbWVcIikudmFsKGVsZW1lbnQuYWRqdXN0bWVudHMpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJNYWdocmliXCI6XHJcbiAgICAgICAgICAgICAgICAkKFwiI21hZ2hyaWItdGltZVwiKS52YWwoZWxlbWVudC5hZGp1c3RtZW50cyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBcIklzaGFcIjpcclxuICAgICAgICAgICAgICAgICQoXCIjaXNoYS10aW1lXCIpLnZhbChlbGVtZW50LmFkanVzdG1lbnRzKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbmJ1aWxkT2JqZWN0KCk7XHJcbi8vICBhc3luYyBmdW5jdGlvbiAgZ2V0REIoKTogUHJvbWlzZTxsb3dkYi5Mb3dkYkFzeW5jPGFueT4+IHtcclxuLy8gICAgIGxldCBfZmlsZU5hbWU6IHN0cmluZyA9ICdjb25maWcvY29uZmlnLmpzb24nOyAgXHJcbi8vICAgICBsZXQgX2RiOiBsb3dkYi5Mb3dkYkFzeW5jPGFueT47XHJcbi8vICAgICByZXR1cm4gX2RiID0gYXdhaXQgbG93ZGIobmV3IGxvd2RiZmlsZShfZmlsZU5hbWUpKTtcclxuLy8gfVxyXG4iXX0=

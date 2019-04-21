(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./js/app"));

},{"./js/app":2}],2:[function(require,module,exports){
"use strict";
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
        // let config:prayerlib.IConfig   = new prayerlib.Configurator();
        $("#fajr-time").val(3);
        $("#submit-button").on("click", () => { alert('Hi'); });
    }
    catch (err) {
    }
}
exports.buildObject = buildObject;

},{}]},{},[1]);

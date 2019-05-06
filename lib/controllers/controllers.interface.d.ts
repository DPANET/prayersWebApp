import { Router } from 'express';
import { PrayersName } from "../models/prayers.model";
export interface IController {
    path: string;
    router: Router;
}
export interface IPrayersView {
    prayerDate: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    sunset: string;
    maghrib: string;
    isha: string;
    midnight: string;
}
export interface IPrayersViewRow {
    prayerDate: string;
    prayerTime: string;
    prayerName: PrayersName;
}

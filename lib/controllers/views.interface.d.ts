import { PrayersName } from "@dpanet/prayers-lib/lib/entities/prayer";
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

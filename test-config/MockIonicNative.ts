import { Observable, Observer } from 'rxjs';

import { NgZone } from '@angular/core';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import {
    InAppBrowser, InAppBrowserEventType, InAppBrowserObject, InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { Platform } from '@ionic/angular';

function getPromise(item?: any): Promise<any> {
    return new Promise((resolve, reject) => {
        if (item === undefined) {
            resolve();
        }
        resolve(item);
    });
}

function getObservable(response: any = ''): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
        observer.next(response);
        observer.complete();
    });
}

export class MarketMock extends Market {
    open(appId: string): Promise<any> {
        return getPromise();
    }
}

export class AppAvailabilityMock extends AppAvailability {
    check(app: string): Promise<boolean> {
        return getPromise(true);
    }
}

export interface InAppBrowserEvent extends Event {
    /** the eventname, either loadstart, loadstop, loaderror, or exit. */
    type: InAppBrowserEventType;
    /** the URL that was loaded. */
    url: string;
    /** the error code, only in the case of loaderror. */
    code: number;
    /** the error message, only in the case of loaderror. */
    message: string;
}

export class InAppBrowserObjectMock extends InAppBrowserObject {

    constructor(url: string, target?: string, options?: string | InAppBrowserOptions) {
        super(url, target, options);
    }

    show(): void { }

    close(): void { }

    hide(): void { }

    executeScript(script: { file?: string; code?: string; }): Promise<any> {
        return getPromise();
    }

    insertCSS(css: { file?: string; code?: string; }): Promise<any> {
        return getPromise();
    }

    on(event: InAppBrowserEventType): Observable<InAppBrowserEvent> {
        const response = {
            type: '',
            url: '',
            code: 0,
            message: ''
        };
        return getObservable(response);
    }
}

export class InAppBrowserMock extends InAppBrowser {
    create(url: string, target?: string, options?: string | InAppBrowserOptions): InAppBrowserObjectMock {
        return new InAppBrowserObjectMock(url);
    }
}

export class DeviceMock extends Device {
    cordova: string;
    /**
     * The device.model returns the name of the device's model or product. The value is set
     * by the device manufacturer and may be different across versions of the same product.
     */
    model: string;
    /** Get the device's operating system name. */
    platform: string;
    /** Get the device's Universally Unique Identifier (UUID). */
    uuid: string;
    /** Get the operating system version. */
    version: string;
    /** Get the device's manufacturer. */
    manufacturer: string;
    /** Whether the device is running on a simulator. */
    isVirtual: boolean;
    /** Get the device hardware serial number. */
    serial: string;
}

export class StatusBarMock extends StatusBar {
    isVisible: boolean;

    overlaysWebView(doesOverlay: boolean): void { }

    styleDefault(): void { }
}

export class ToastMock extends Toast {

    show(message: string, duration: string, position: string): Observable<any> {
        return getObservable();
    }

    hide(): Promise<any> {
        return getPromise();
    }
}

export class NetworkMock extends Network {
    type = 'cellular';
    downlinkMax: string;
    onchange(): Observable<any> {
        return getObservable();
    }

    onDisconnect(): Observable<any> {
        return getObservable();
    }

    onConnect(): Observable<any> {
        return getObservable();
    }
}

export class PlatformMock extends Platform {
    public ready(): Promise<string> {
        return getPromise('READY');
    }

    public registerBackButtonAction(fn: Function, priority?: number): Function {
        return (() => true);
    }

    public hasFocus(ele: HTMLElement): boolean {
        return true;
    }

    public is(): boolean {
        return true;
    }

    public getElementComputedStyle(container: any): any {
        return {
            paddingLeft: '10',
            paddingTop: '10',
            paddingRight: '10',
            paddingBottom: '10',
        };
    }

    public onResize(callback: any) {
        return callback;
    }

    public registerListener(ele: any, eventName: string, callback: any): Function {
        return (() => true);
    }

    public raf(callback: any): number {
        return 1;
    }

    public timeout(callback: any, timer: number): any {
        return setTimeout(callback, timer);
    }

    public cancelTimeout(id: any) {
        // do nothing
    }

    public getActiveElement(): any {
        return document['activeElement'];
    }
}

export function newPlatformMock() {
    let ng: NgZone;
    return new PlatformMock('', ng);
}

export class PlatformMock2 extends Platform {

    public _platforms = ['core'];

    public ready(): Promise<string> {
        return new Promise((resolve) => {
            resolve();
        });
    }
}

export interface CalendarOptions {
    /**
     * Id
     */
    id?: string;
    /**
     *
     */
    firstReminderMinutes?: number;
    /**
     *
     */
    secondReminderMinutes?: number;
    /**
     * Recurrence. Can be set to `daily`, `weekly`, `monthly` or `yearly`
     */
    recurrence?: string;
    /**
     * Recurrence interval. Valid only when `recurrence` option is set.
     */
    recurrenceInterval?: number;
    /**
     * Recurrence end date. Valid only when `recurrence` option is set.
     */
    recurrenceEndDate?: Date;
    /**
     * Calendar name. Ths is supported by `iOS` only.
     */
    calendarName?: string;
    /**
     * Calendar id
     */
    calendarId?: number;
    /**
     * URL
     */
    url?: string;
}

export class CalendarMock extends Calendar {

    deleteEvent = this.createEvent;
    hasReadWritePermission(): Promise<boolean> {
        return getPromise(true);
    }

    hasReadPermission(): Promise<boolean> {
        return getPromise(true);
    }

    hasWritePermission(): Promise<boolean> {
        return getPromise(true);
    }

    requestWritePermission(): Promise<any> {
        return getPromise(true);
    }

    requestReadPermission(): Promise<any> {
        return getPromise(true);
    }

    requestReadWritePermission(): Promise<any> {
        return getPromise(true);
    }

    createEvent(title?: string, location?: string, notes?: string, startDate?: Date, endDate?: Date): Promise<any> {
        return getPromise(true);
    }

    createEventWithOptions(
        title?: string,
        location?: string,
        notes?: string,
        startDate?: Date,
        endDate?: Date,
        options?: CalendarOptions
    ): Promise<any> {
        return getPromise(true);
    }

    listEventsInRange(startDate: Date, endDate: Date): Promise<any> {
        return getPromise(true);
    }
}

export class SplashScreenMock extends SplashScreen {
    hide() {
        return;
    }
}

export class ModalControllerMock {
    public create = jasmine.createSpy('create').and.returnValue(
        Promise.resolve({
            present: jasmine.createSpy('present').and.returnValue(Promise.resolve()),
            onDidDismiss: jasmine.createSpy('onDidDismiss').and.returnValue(Promise.resolve({ 'data': [0, 1] }))
        })
    );
    public dismiss = jasmine.createSpy('dismiss').and.returnValue(Promise.resolve());
}

export class AppVersionMock extends AppVersion {
    getVersionCode(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    getVersionNumber(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export class NavParamsMock {

    static returnParams: any = {};

    static setParams(key, value): any {
        NavParamsMock.returnParams[key] = value;
    }

    public get(key): any {
        if (NavParamsMock.returnParams[key]) {
            return NavParamsMock.returnParams[key] = [];
        }
        return [];
    }

}

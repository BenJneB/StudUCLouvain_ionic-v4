import { Observable, Observer } from 'rxjs';

import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Device } from '@ionic-native/device/ngx';
import {
    InAppBrowser, InAppBrowserObject, InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';

export class MarketMock extends Market {
    open(appId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export class AppAvailabilityMock extends AppAvailability {
    check(app: string): Promise<boolean> {
        let response: boolean;
        return new Promise((resolve, reject) => {
            resolve(response);
        });
    }
}

export interface InAppBrowserEvent extends Event {
    /** the eventname, either loadstart, loadstop, loaderror, or exit. */
    type: string;
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
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    insertCSS(css: { file?: string; code?: string; }): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }

    on(event: string): Observable<InAppBrowserEvent> {
        let response: InAppBrowserEvent;
        return Observable.create((observer: Observer<any>) => {
            observer.next(response);
            observer.complete();
        });
    }
}

export class InAppBrowserMock extends InAppBrowser {
    create(url: string, target?: string, options?: string | InAppBrowserOptions): InAppBrowserObjectMock {
        const response = new InAppBrowserObjectMock(url);
        return response;
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

export class MockCacheStorageService {
    constructor(a, b) { }

    public ready() {
        return true;
    }
}

export class ToastMock extends Toast {

    show(message: string, duration: string, position: string): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next('');
            observer.complete();
        });
    }

    hide(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

export class NetworkMock extends Network {
    type = 'cellular';
    downlinkMax: string;
    onchange(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next('');
            observer.complete();
        });
    }

    onDisconnect(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next('');
            observer.complete();
        });
    }

    onConnect(): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            observer.next('');
            observer.complete();
        });
    }
}

export class PlatformMock {
    public ready(): Promise<string> {
        return new Promise((resolve) => {
            resolve('READY');
        });
    }

    public getQueryParam() {
        return true;
    }

    public registerBackButtonAction(fn: Function, priority?: number): Function {
        return (() => true);
    }

    public hasFocus(ele: HTMLElement): boolean {
        return true;
    }

    public doc(): HTMLDocument {
        return document;
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

    public win(): Window {
        return window;
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

import { Observable, Observer } from 'rxjs';

import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Device } from '@ionic-native/device/ngx';
import {
    InAppBrowser, InAppBrowserObject, InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';

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

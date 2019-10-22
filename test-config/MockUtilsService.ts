import { CacheService } from 'ionic-cache';
import { AlertService } from 'src/app/services/utils-services/alert-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { FacService } from 'src/app/services/utils-services/fac-service';
import { UserService } from 'src/app/services/utils-services/user-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';

import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { Storage, StorageConfig } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

import { AppAvailabilityMock, CalendarMock, DeviceMock, InAppBrowserMock, MarketMock, NetworkMock } from './MockIonicNative';
import { HttpClientMock } from './MockWso2Services';

export class MockUtilsService extends UtilsService {
    constructor(
        user: UserService,
        translateService: TranslateService,
        alertCtrl: AlertController,
        appAvailability: AppAvailabilityMock,
        market: MarketMock,
        iab: InAppBrowserMock,
        device: DeviceMock,
        cache: CacheService,
        connService: MockConnectivityService,
        router: Router,
        calendar: CalendarMock,
        alertService: AlertService
    ) {
        super(
            user,
            translateService,
            alertCtrl,
            appAvailability,
            market,
            iab,
            device,
            cache,
            connService,
            router,
            calendar,
            alertService
        );
    }

    launchExternalApp() { }
    createEventInCalendar() { }
    doRefresh() { }
    addFavorite() {
        return new Promise<void>(() => { });
    }
}

export function newMockUtilsService() {
    const user = newMockUserService();
    let translateService: TranslateService;
    let alertCtrl: AlertController;
    let appAvailability: AppAvailabilityMock;
    let market: MarketMock;
    let iab: InAppBrowserMock;
    let device: DeviceMock;
    let cache: CacheService;
    let connService: MockConnectivityService;
    let router: Router;
    let calendar: CalendarMock;
    let alertService: AlertService;
    return new MockUtilsService(
        user,
        translateService,
        alertCtrl,
        appAvailability,
        market,
        iab,
        device,
        cache,
        connService,
        router,
        calendar,
        alertService
    );
}


export class MockConnectivityService extends ConnectivityService {
    constructor(
        platform: Platform,
        network: NetworkMock,
        translateService: TranslateService,
        alertCtrl: AlertController,
    ) {
        super(platform, network, translateService, alertCtrl);
    }

    presentConnectionAlert() {
        return new Promise<void>(() => {

        });
    }
}

export function newMockConnectivityService() {
    const platform = new Platform('', new NgZone({}));
    let network: NetworkMock;
    let translateService: TranslateService;
    let alertCtrl: AlertController;
    return new MockConnectivityService(platform, network, translateService, alertCtrl);
}

export class MockFacService extends FacService {
    constructor(http: HttpClientMock) {
        super(http);
    }

    loadResources() {
        return new Promise(() => {

        });
    }
}

export function newMockFacService() {
    let http: HttpClientMock;
    return new MockFacService(http);
}

export class MockUserService extends UserService {
    constructor(storage: Storage) {
        super(storage);
    }

    addFac() { }
}

export function newMockUserService() {
    let config: StorageConfig;
    const storage = new Storage(config);
    return new MockUserService(storage);
}

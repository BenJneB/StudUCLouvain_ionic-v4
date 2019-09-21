import { CacheService } from 'ionic-cache';
import { AlertService } from 'src/app/services/utils-services/alert-service';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { UserService } from 'src/app/services/utils-services/user-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';

import { NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import {
    AppAvailabilityMock, DeviceMock, InAppBrowserMock, MarketMock, NetworkMock
} from './MockIonicNative';

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
        calendar: Calendar,
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
}

export function newMockUtilsService() {
    let user: UserService;
    let translateService: TranslateService;
    let alertCtrl: AlertController;
    let appAvailability: AppAvailabilityMock;
    let market: MarketMock;
    let iab: InAppBrowserMock;
    let device: DeviceMock;
    let cache: CacheService;
    let connService: MockConnectivityService;
    let router: Router;
    let calendar: Calendar;
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
        diagnostic: Diagnostic
    ) {
        super(platform, network, translateService, alertCtrl, diagnostic);
    }
}

export function newMockConnectivityService() {
    const platform = new Platform('', new NgZone({}));
    let network: NetworkMock;
    let translateService: TranslateService;
    let alertCtrl: AlertController;
    let diagnostic: Diagnostic;
    return new MockConnectivityService(platform, network, translateService, alertCtrl, diagnostic);
}

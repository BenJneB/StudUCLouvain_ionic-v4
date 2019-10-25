import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';
import { AppAvailabilityMock, CalendarMock, DeviceMock, MarketMock } from 'test-config/MockIonicNative';

import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { UtilsService } from '../utils-services';
import { ConnectivityService } from '../connectivity-service';
import { newMockAlertService, newMockConnectivityService, newMockUserService } from 'test-config/MockUtilsService';
import { getMockProvider, newMockTranslateService } from 'test-config/Mock';
import { Router } from '@angular/router';
import { AlertService } from '../alert-service';

function newServiceInstance() {
    let user = newMockUserService(), translate = newMockTranslateService(), alert: AlertController, app: AppAvailability, market: Market,
        iab: InAppBrowser, device: Device, cache: CacheService, connectivityService: ConnectivityService, router: Router,
        calendar: Calendar, alertService = newMockAlertService(), navCtrl: NavController;
    return new UtilsService(user, translate, alert, app, market, iab, device, cache, connectivityService, router,
        calendar, alertService, navCtrl);
}

fdescribe('UtilsService', () => {
    const service = newServiceInstance();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                {provide: AppAvailability, useClass: AppAvailabilityMock},
                {provide: Market, useClass: MarketMock},
                {provide: Device, useClass: DeviceMock},
                CacheService,
                {
                    provide: CacheStorageService, useFactory: () => {
                        return new MockCacheStorageService(null, null);
                    }
                },
                {provide: Calendar, useClass: CalendarMock},
                getMockProvider(ConnectivityService, newMockConnectivityService),
                getMockProvider(TranslateService, newMockTranslateService),
                getMockProvider(AlertService, newMockAlertService),
            ]
        });
    });

    it('should create service', () => expect(service).toBeDefined());

    describe('addFavorite method', () => {
        it('should call removeFavorite if has favorite', () => {
            const spyRemove = spyOn(service, 'removeFavorite').and.callThrough();
            spyOn(service.user, 'hasFavorite').and.callThrough().and.returnValue(true);
            service.addFavorite({guid: {}}, {});
            expect(spyRemove.calls.count()).toEqual(1);
        });

        it('should call addFavorite if not has favorite', () => {
            const spyAdd = spyOn(service.user, 'addFavorite').and.callThrough();
            const spyPresent = spyOn(service.alertService, 'presentToast').and.callThrough();
            spyOn(service.user, 'hasFavorite').and.callThrough().and.returnValue(false);
            service.addFavorite({guid: {}}, {});
            expect(spyAdd.calls.count()).toEqual(1);
            expect(spyPresent.calls.count()).toEqual(1);
        });
    });
});

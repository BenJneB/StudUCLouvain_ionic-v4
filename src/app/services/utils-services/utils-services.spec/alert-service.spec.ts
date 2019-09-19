import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { AlertService } from 'src/app/services/utils-services/alert-service';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';
import {
    AppAvailabilityMock, CalendarMock, DeviceMock, InAppBrowserMock, MarketMock, NetworkMock
} from 'test-config/MockIonicNative';

import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

fdescribe('AlertService', () => {
    let alertService: AlertService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [
                IonicModule.forRoot(),
                IonicStorageModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                AlertService,
                { provide: AppAvailability, useClass: AppAvailabilityMock },
                { provide: Market, useClass: MarketMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: Device, useClass: DeviceMock },
                CacheService,
                {
                    provide: CacheStorageService, useFactory: () => {
                        return new MockCacheStorageService(null, null);
                    }
                },
                Diagnostic,
                { provide: Network, useClass: NetworkMock },
                { provide: Calendar, useClass: CalendarMock },
            ]
        });
    }));

    beforeEach(() => {
        alertService = TestBed.get(AlertService);
    });

    it('should create service', () => expect(alertService).toBeDefined());
});

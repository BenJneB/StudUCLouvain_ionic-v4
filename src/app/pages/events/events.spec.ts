import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { EventItem } from 'src/app/entity/eventItem';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { displayedEventsDFactory } from '../../../../test-config/factories/displayedEventsDFactory';
import {
    MockCacheStorageService, StorageMock
} from '../../../../test-config/MockCacheStorageService';
import {
    AppAvailabilityMock, CalendarMock, DeviceMock, InAppBrowserMock, MarketMock,
    ModalControllerMock, NetworkMock
} from '../../../../test-config/MockIonicNative';
/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors: Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date: 2018-2019
    This file is part of Stud.UCLouvain
    Licensed under the GPL 3.0 license. See LICENSE file in the project root for full license information.

    Stud.UCLouvain is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    Stud.UCLouvain is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with Stud.UCLouvain.  If not, see <http://www.gnu.org/licenses/>.
*/
import { EventsPage } from './events';

describe('Events Component', () => {
    let fixture;
    let component;
    const dateLimit = '2018-01-26';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: ModalController, useClass: ModalControllerMock },
                { provide: Device, useClass: DeviceMock },
                { provide: Market, useClass: MarketMock },
                { provide: AppAvailability, useClass: AppAvailabilityMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                // AppVersion,
                //     { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: CacheService, useClass: StorageMock },
                {
                    provide: CacheStorageService, useFactory: () => {
                        return new MockCacheStorageService(null, null);
                    }
                },
                { provide: Network, useClass: NetworkMock },
                Diagnostic,
                { provide: Calendar, useClass: CalendarMock },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
        expect(component instanceof EventsPage).toBeTruthy();
    });

    describe('goToEventDetail method', () => {
        it('should call goToDetail of UtilsService', () => {
            const spyGoDetail = spyOn(component.utilsServices, 'goToDetail').and.callThrough();
            const spySaveItem = spyOn(component.cache, 'saveItem').and.callThrough();
            const spyGetItem = spyOn(component.cache, 'getItem').and.callThrough();
            const eventItem = new EventItem(
                'description',
                'link',
                'title',
                'image',
                'trimmedD',
                'location',
                false,
                false,
                'guid',
                (d => new Date(d.setDate(d.getDate() - 1)))(new Date),
                (d => new Date(d.setDate(d.getDate() + 1)))(new Date),
                'cat',
                'iconCat'
            );
            component.goToEventDetail(eventItem);
            expect(spyGoDetail.calls.count()).toEqual(1);
            expect(spyGoDetail.calls.first().args[0]).toEqual(eventItem);
            expect(spyGoDetail.calls.first().args[1]).toEqual('events/details');
        });
    });

    // describe('goToLibDetails method', () => {
    //     it('should call goToDetail with libItem and libraries/details from utilsServices', () => {
    //         const spyGoToDetail = spyOn(component.utilsServices, 'goToDetail').and.callThrough();
    //         component.goToLibDetails('libItem');
    //         expect(spyGoToDetail.calls.count()).toEqual(1);
    //         expect(spyGoToDetail).toHaveBeenCalledWith('libItem', 'libraries/details');
    //     });
    // });
});


import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { spyFunctionWithCallBackThen, testInstanceCreation } from 'src/app/app.component.spec';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
import { MockCacheStorageService, StorageMock } from 'test-config/MockCacheStorageService';
import { newMockConnectivityService, newMockUtilsService } from 'test-config/MockUtilsService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import {
    AppAvailabilityMock, CalendarMock, DeviceMock, InAppBrowserMock, MarketMock,
    ModalControllerMock, NetworkMock
} from '../../../../test-config/MockIonicNative';
/**
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
import { LibrariesPage } from './libraries';

describe('Libraries Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LibrariesPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                {
                    provide: UtilsService, useFactory: () => {
                        return newMockUtilsService();
                    }
                },
                {
                    provide: ConnectivityService, useFactory: () => {
                        return newMockConnectivityService();
                    }
                },
                { provide: ModalController, useClass: ModalControllerMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                CacheService,
                {
                    provide: CacheStorageService, useFactory: () => {
                        return new MockCacheStorageService(null, null);
                    }
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LibrariesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, LibrariesPage);
    });

    describe('goToLibDetails method', () => {
        it('should call goToDetail with libItem and libraries/details from UtilsService', () => {
            const spyGoToDetail = spyOn(component.utilsServices, 'goToDetail').and.callFake(() => { });
            component.goToLibDetails('libItem');
            expect(spyGoToDetail.calls.count()).toEqual(1);
            expect(spyGoToDetail).toHaveBeenCalledWith('libItem', 'libraries/details');
        });
    });

    describe('loadLibraries method', () => {
        let spyOnline;
        let spySaveItem;
        let spyLoad;
        beforeEach(() => {
            spySaveItem = spyOn(component.cache, 'saveItem').and.callFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });
        });

        it('should call isOnline from ConnectivityService, if online, should loadLibraries', () => {
            spyOnline = spyOn(component.connService, 'isOnline').and.callThrough();
            spyLoad = spyFunctionWithCallBackThen(component.libService, 'loadLibraries', {});
            component.loadLibraries();
            expect(spyOnline.calls.count()).toEqual(1);
            expect(component.searching).toBeFalsy();
            expect(spyLoad.calls.count()).toEqual(1);
            expect(spySaveItem.calls.count()).toEqual(0);
        });

        it('and should call saveItem from Cache if key in parameter', () => {
            spyOnline = spyOn(component.connService, 'isOnline').and.callThrough();
            spyLoad = spyFunctionWithCallBackThen(component.libService, 'loadLibraries', {});
            component.loadLibraries('key');
            expect(spyOnline.calls.count()).toEqual(1);
            expect(component.searching).toBeFalsy();
            expect(spyLoad.calls.count()).toEqual(1);
            expect(spySaveItem.calls.count()).toEqual(1);
        });

        it('if not online, should call presentConnectionAlert', () => {
            spyOnline = spyOn(component.connService, 'isOnline').and.returnValue(false);
            const spyPresentAlert = spyOn(component.connService, 'presentConnectionAlert').and.callThrough();
            component.loadLibraries();
            expect(spyOnline.calls.count()).toEqual(1);
            expect(spyPresentAlert.calls.count()).toEqual(1);
            expect(component.searching).toBeFalsy();
        });
    });

    describe('doRefresh method', () => {
        it('should call doRefresh from UtilsService', () => {
            const spyRefresh = spyOn(component.utilsServices, 'doRefresh').and.callThrough();
            spyOn(component.cache, 'removeItem').and.callFake(() => {
                return new Promise((resolve, reject) => {
                    resolve();
                });
            });
            component.doRefresh({ target: { complete: () => { return; } } });
            expect(spyRefresh.calls.count()).toEqual(1);
        });
    });

    describe('cachedOrNot method', () => {
        it('should call getItem from Cache', () => {
            const spyGetItem = spyOn(component.cache, 'getItem').and.callThrough();
            component.cachedOrNot();
            expect(spyGetItem.calls.count()).toEqual(1);
            expect(spyGetItem.calls.first().args[0]).toEqual('cache-libraries');
            expect(component.searching).toBeFalsy();
        });
        it('should call loadLibraries on reject', async () => {
            // TODO: COMMENT TO TEST
            const spyReject = spyOn(component.cache, 'getItem').and.returnValue(Promise.reject('ERROR'));
            // const spyLoad = spyOn(component, 'loadLibraries').and.callThrough();
            await component.cachedOrNot();
            expect(spyReject.calls.count()).toEqual(1);
            // expect(spyLoad.calls.count()).toEqual(1);
        });
    });
});

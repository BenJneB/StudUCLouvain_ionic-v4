import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { HttpClient } from 'selenium-webdriver/http';
import { spyFunctionWithCallBackThen, testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule, IonItemSliding, ModalController } from '@ionic/angular';
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
import { SportsPage } from './sports';

describe('Sports Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SportsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                { provide: ModalController, useClass: ModalControllerMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: AppAvailability, useClass: AppAvailabilityMock },
                { provide: Market, useClass: MarketMock },
                { provide: Device, useClass: DeviceMock },
                CacheService,
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
        fixture = TestBed.createComponent(SportsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, SportsPage);
    });

    describe('doRefresh method', () => {
        it('should call loadSports', () => {
            const spyLoad = spyOn(component, 'loadSports').and.callThrough();
            spyOn(component.utilsServices.cache, 'removeItem').and.returnValue(
                new Promise((resolve, reject) => { })
            );
            component.doRefresh({ target: { complete: () => { return; } } });
            expect(spyLoad.calls.count()).toBeGreaterThan(0);
        });
    });

    describe('isNotFavorite method', () => {
        it('should return true if segment is all or team', () => {
            component.segment = 'all';
            let result = component.isNotFavorite();
            expect(result).toBeTruthy();

            component.segment = 'team';
            result = component.isNotFavorite();
            expect(result).toBeTruthy();
        });

        it('should return false otherwise', () => {
            component.segment = 'XXX';
            const result = component.isNotFavorite();
            expect(result).toBeFalsy();
        });
    });

    describe('getFiltersData method', () => {
        it('should return teams data if arg=true', () => {
            _shouldReturnCorrectData(true);
        });

        it('should return sports data if arg=false', () => {
            _shouldReturnCorrectData(false);
        });

        function _shouldReturnCorrectData(teams: boolean) {
            const result = component.getFiltersData(teams);
            expect(result).toEqual({
                filters: teams ? component.filtersT : component.filters,
                exclude: teams ? component.excludedFiltersT : component.excludedFilters
            });
        }
    });

    describe('loadSports method', () => {
        it('OFFLINE : should call pop from NavCtrl and present alert', () => {
            const spyOnline = spyOn(component.connService, 'isOnline').and.returnValue(false);
            const spyPop = spyOn(component.navCtrl, 'pop').and.callThrough();
            const spyPresent = spyOn(component.connService, 'presentConnectionAlert').and.callThrough();
            component.loadSports('segment');
            expect(spyOnline.calls.count()).toEqual(1);
            expect(spyPop.calls.count()).toEqual(1);
            expect(spyPresent.calls.count()).toEqual(1);
        });
    });

    describe('onSearchInput method', () => {
        it('should set searching to True', () => {
            spyOn(component.utilsServices.cache, 'removeItem').and.returnValue(
                new Promise((resolve, reject) => { })
            );
            component.onSearchInput();
            expect(component.searching).toBeTruthy();
        });
    });

    describe('toggleGroup method', () => {
        it('should call toggleGroup from UtilsService', () => {
            const spyToggle = spyOn(component.utilsServices, 'toggleGroup').and.callThrough();
            component.toggleGroup('');
            expect(spyToggle.calls.count()).toEqual(1);
        });
    });

    describe('changeArray method', () => {
        it('should call getItemDisplay from UtilsService', () => {
            const spyGetItem = spyOn(component.utilsServices, 'getItemDisplay').and.callThrough();
            component.changeArray([{ 'jour': 'DAY' }]);
            expect(spyGetItem.calls.count()).toEqual(1);
        });
    });

    describe('filterDisplayedSports method', () => {
        it('should call filterItems from UtilsService', () => {
            const spyFilter = spyOn(component.utilsServices, 'filterItems').and.callThrough();
            component.filterDisplayedSports([], '');
            expect(spyFilter.calls.count()).toEqual(1);
        });
    });

    describe('assignDatas method', () => {
        it('should set searching to False', () => {
            component.assignDatas(false, { sports: [] });
            expect(component.searching).toBeFalsy();
        });
    });

    describe('removeFavorite method', () => {
        it('should call removeFavorite from UtilsService and updateDisplayed', async () => {
            const spyRemove = spyFunctionWithCallBackThen( // TODO: not function with then. async method, have to spy on await call
                component.utilsServices,
                'removeFavorite',
                {}
            );
            const spyUpdate = spyOn(component, 'updateDisplayed').and.callThrough();
            await component.removeFavorite();
            expect(spyRemove.calls.count()).toEqual(1);
            expect(spyUpdate.calls.count()).toEqual(1);
        });
    });

    describe('addFavorite method', () => {
        it('should call addFavorite from UtilsService', () => {
            const spyAdd = spyOn(component.utilsServices, 'addFavorite').and.callThrough();
            let ionItemSliding: IonItemSliding;
            component.addFavorite(ionItemSliding, { 'guid': 0 });
            expect(spyAdd.calls.count()).toEqual(1);
        });
    });

    describe('addToCalendar method', () => {
        it('should call createEventWithOptions from Calendar', () => {
            const spyCreate = spyOn(component.calendar, 'createEventWithOptions').and.callThrough();
            component.addToCalendar(
                { 'close': () => { } },
                '',
            );
            expect(spyCreate.calls.count()).toEqual(1);
        });
    });

    fdescribe('presentFilter method', () => {
        it('should call create from ModalController', () => {
            const spyGetFilters = spyOn(component, 'getFiltersData').and.callThrough().and.returnValue({
                'filters': undefined,
                'exclude': []
            });
            component.presentFilter();
            expect(component.modalCtrl.create.calls.count()).toEqual(1);
            expect(spyGetFilters.calls.count()).toEqual(1);
        });
    });
});

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

    describe('assignDatas method', () => {
        it('should call updateDisplayed', () => {
            const spyUpdate = spyOn(component, 'updateDisplayed').and.returnValue(() => { }).and.callThrough();
            component.assignDatas(false, { sports: [] });
            expect(spyUpdate.calls.count()).toEqual(1);
            expect(component.searching).toBeFalsy();
        });
    });
});

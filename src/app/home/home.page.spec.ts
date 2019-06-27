import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';
import {
    AppAvailabilityMock, DeviceMock, MarketMock, NetworkMock, SplashScreenMock
} from 'test-config/MockIonicNative';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController, IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { MockAlertController } from '../../../test-config/MockAlert';
import { CalendarMock, InAppBrowserMock } from '../../../test-config/MockIonicNative';
import { testInstanceCreation } from '../app.component.spec';
import { HomePage } from './home.page';

describe('Home Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                { provide: Market, useClass: MarketMock },
                { provide: AppAvailability, useClass: AppAvailabilityMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: AlertController, useClass: MockAlertController },
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
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, HomePage);
    });

    describe('changePage method', () => {
        it('should call launchExternalApp of UtilsService if external application', () => {
            const spyLaunch = spyOn(component.utilsServices, 'launchExternalApp').and.callThrough();
            component.changePage({ iosSchemaName: 'name' });
            expect(spyLaunch.calls.count()).toEqual(1);
        });

        it('should call navigateForward of NavController otherwhise', () => {
            const spyNavigate = spyOn(component.nav, 'navigateForward').and.callThrough();
            component.changePage({ iosSchemaName: null, component: '/' });
            expect(spyNavigate.calls.count()).toEqual(1);
        });
    });

    describe('updateCampus method', () => {
        it('should call addCampus of UserService', () => {
            function add(item: string) {
                return {
                    subscribe: (success: Function, error: Function) => {
                        success();
                    }
                };
            }
            const spyAdd = spyOn(component.userS, 'addCampus').and.callFake(add).and.callThrough();
            component.updateCampus();
            expect(spyAdd.calls.count()).toEqual(1);
            expect(spyAdd.calls.first().args[0]).toEqual('');
        });
    });

    describe('openURL method', () => {
        it('should call create of InAppBrowser', () => {
            const spyCreate = spyOn(component.iab, 'create').and.callThrough();
            component.openURL('url');
            expect(spyCreate.calls.count()).toEqual(1);
            expect(spyCreate.calls.first().args[0]).toEqual('url');
        });
    });

    describe('openUCL method', () => {
        it('should call create of InAppBrowser', () => {
            const spyCreate = spyOn(component.iab, 'create').and.callThrough();
            component.openUCL('url');
            expect(spyCreate.calls.count()).toEqual(1);
            expect(spyCreate.calls.first().args[0]).toEqual('url');
        });
    });

    describe('ionViewDidEnter method', () => {
        it('should call setTimeout of NodeJS', () => {
            const spySetTimeout = spyOn(window, 'setTimeout').and.callThrough();
            component.ionViewDidEnter();
            expect(spySetTimeout.calls.count()).toEqual(1);
        });
    });

    describe('emergency method', () => {
        it('should call getEmergencyTexts', () => {
            const spyGetEmergencyTexts = spyOn(component, 'getEmergencyTexts').and.callThrough();
            component.emergency();
            expect(spyGetEmergencyTexts.calls.count()).toEqual(1);
        });
        it('should call getEmergencyMsg', () => {
            const spyGetEmergencyMsg = spyOn(component, 'getEmergencyMsg').and.callThrough();
            component.emergency();
            expect(spyGetEmergencyMsg.calls.count()).toEqual(1);
        });
        it('should call create and present of AlertController', () => {
            const spyCreate = spyOn(component.alertCtrl, 'create').and.callThrough();
            component.emergency();
            expect(spyCreate.calls.count()).toEqual(1);
        });
    });
});

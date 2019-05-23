import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import {
    AppAvailabilityMock, DeviceMock, MarketMock, MockCacheStorageService, NetworkMock,
    SplashScreenMock
} from 'test-config/mocks-ionic';

import { HttpClientModule } from '@angular/common/http';
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
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarMock, InAppBrowserMock } from '../../../test-config/mocks-ionic';
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
                HttpClientModule,
            ],
            providers: [
                { provide: Market, useClass: MarketMock },
                { provide: AppAvailability, useClass: AppAvailabilityMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
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
        expect(component).toBeTruthy();
        expect(component instanceof HomePage).toBe(true);
    });

    it('should initialize component variables', () => {
        TestBed.compileComponents().then(() => {
            expect(component.libraryPage).toEqual({
                title: 'MENU.LIBRARY', component: '/libraries',
                iosSchemaName: null, androidPackageName: null,
                appUrl: null, httpUrl: null
            });
            expect(component.newsPage).toEqual({
                title: 'MENU.NEWS', component: '/news',
                iosSchemaName: null, androidPackageName: null,
                appUrl: null, httpUrl: null
            });
            expect(component.eventPage).toEqual({
                title: 'MENU.EVENTS', component: '/events',
                iosSchemaName: null, androidPackageName: null,
                appUrl: null, httpUrl: null
            });
            expect(component.sportPage).toEqual({
                title: 'MENU.SPORTS', component: '/sports',
                iosSchemaName: null, androidPackageName: null,
                appUrl: null, httpUrl: null
            });
        });
    });

    describe('changePage method', () => {

        beforeEach(() => {
        });

        it('should call launchExternalApp of UtilsService if external application', () => {
            const spyLaunch = spyOn(component.utilsServices, 'launchExternalApp').and.callThrough();
            TestBed
                .compileComponents()
                .then(() => {
                    component.changePage({ iosSchemaName: 'name' });
                    expect(spyLaunch.calls.count()).toEqual(1);
                });
        });

        it('should call navigateForward of NavController otherwhise', () => {
            const spyNavigate = spyOn(component.nav, 'navigateForward').and.callThrough();
            TestBed
                .compileComponents()
                .then(() => {
                    component.changePage({ iosSchemaName: null, component: [] });
                    expect(spyNavigate.calls.count()).toEqual(1);
                });
        });
    });

    describe('updateCampus method', () => {

        beforeEach(() => {
        });

        it('should call addCampus of UserService', () => {
            function add(item: string) {
                return {
                    subscribe: (success: Function, error: Function) => {
                        success();
                    }
                };
            }
            const spyAdd = spyOn(component.userS, 'addCampus').and.callFake(add).and.callThrough();
            TestBed
                .compileComponents()
                .then(() => {
                    component.updateCampus();
                    expect(spyAdd.calls.count()).toEqual(1);
                    expect(spyAdd.calls.first().args[0]).toEqual('');
                });
        });
    });
});

import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

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
import { NewsPage } from './news';

describe('News Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewsPage],
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
        fixture = TestBed.createComponent(NewsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, NewsPage);
    });

    describe('openURL method', () => {
        it('should call create from InAppBrowser', () => {
            const spyCreate = spyOn(component.iab, 'create').and.callThrough();
            component.openURL('');
            expect(spyCreate.calls.count()).toEqual(1);
        });
    });

    describe('updateFac method', () => {
        it('should add selected Fac and find existing site before loadNews', () => {
            const spyAdd = spyOn(component.userS, 'addFac').and.callThrough();
            const spyFind = spyOn(component, 'findSite').and.callThrough();
            const spyLoad = spyOn(component, 'loadNews').and.callThrough();
            component.updateFac('');
            expect(spyAdd.calls.count()).toEqual(1);
            expect(spyFind.calls.count()).toEqual(1);
            expect(spyLoad.calls.count()).toEqual(1);
        });
    });

    describe('findSite method', () => {
        it('should call getAvailableSites', () => {
            const spyGet = spyOn(component, 'getAvailableSites').and.callThrough();
            component.listFac = [{ facs: {} }];
            component.findSite();
            expect(spyGet.calls.count()).toEqual(1);
        });
    });

    describe('removeFac method', () => {
        it('should call removeFac from UserService', () => {
            const spyRemove = spyOn(component.userS, 'removeFac').and.callThrough();
            component.removeFac('');
            expect(spyRemove.calls.count()).toEqual(1);
        });
    });

    describe('getAvailableSites method', () => {
        it('should set sites and rss\'s', () => {
            component.fac = 'TEST';
            _testGetAvailableSites(component, 'site', 'rss');
        });

        it('should left site/rss empty if not corresponding acronym', () => {
            component.fac = 'FAIL';
            _testGetAvailableSites(component, '', '');
        });
    });

    describe('doRefresh method', () => {
        it('should call isOnline from ConnectivityService', () => {
            const spyOnline = spyOn(component.connService, 'isOnline').and.callThrough();
            spyOn(component.utilsServices.cache, 'removeItem').and.returnValue(
                new Promise((resolve, reject) => { })
            );
            component.doRefresh({ target: { complete: () => { return; } } });
            expect(spyOnline.calls.count()).toBeGreaterThan(0);
        });
    });

    describe('handleOnlineRefresh method', () => {
        it('should call removeFac from UserService', () => {
            const spyLoad = spyOn(component, 'loadNews').and.callThrough();
            spyOn(component.utilsServices.cache, 'removeItem').and.returnValue(
                new Promise((resolve, reject) => { })
            );
            component.handleOnlineRefresh(true, { target: { complete: () => { return; } } });
            expect(spyLoad.calls.count()).toEqual(1);
        });
    });

    describe('getKey method', () => {
        it('should return cache-P1 if first segment', () => {
            _checkGetKeySegment(component, 'P1');
        });
        it('should return cache-P2 if second segment', () => {
            _checkGetKeySegment(component, 'P2');
        });
        it('should return cache-P3 if third segment', () => {
            _checkGetKeySegment(component, 'P3');
        });
    });

    describe('tabChanged method', () => {
        it('should call cachedOrNot if Univ Segment', () => {
            const spyCachedOrNot = spyOn(component, 'cachedOrNot').and.callThrough();
            component.tabChanged({ 'detail': { 'value': 'univ' } });
            expect(spyCachedOrNot.calls.count()).toEqual(1);
        });

        it('should call manageMainTabFac if Fac Segment', () => {
            const spyManage = spyOn(component, 'manageMainTabFac').and.callThrough();
            component.tabChanged({ 'detail': { 'value': 'fac' } });
            expect(spyManage.calls.count()).toEqual(1);
        });
    });

    describe('updateDisplayed method', () => {
        it('should call removeFac from UserService', () => {
            const spyDismiss = spyOn(component.loader, 'dismiss').and.callThrough();
            component.updateDisplayed();
            expect(spyDismiss.calls.count()).toEqual(1);
            expect(component.searching).toBeFalsy();
        });
    });

    describe('goToNewsDetail method', () => {
        it('should call goToDetail from UtilsService', () => {
            const spyGo = spyOn(component.utilsServices, 'goToDetail').and.callFake(() => { });
            component.goToNewsDetail();
            expect(spyGo.calls.count()).toEqual(1);
        });
    });
});
function _checkGetKeySegment(component: any, subsegment: string) {
    component.subsegment = subsegment;
    const result = component.getKey();
    expect(result).toEqual('cache-' + subsegment);
}

function _testGetAvailableSites(component: any, site: string, rss: string) {
    expect(component.site).toEqual('');
    expect(component.rss).toEqual('');
    component.getAvailableSites({ facs: [{ acro: 'TEST', site: 'site', rss: 'rss' }] });
    expect(component.site).toEqual(site);
    expect(component.rss).toEqual(rss);
}


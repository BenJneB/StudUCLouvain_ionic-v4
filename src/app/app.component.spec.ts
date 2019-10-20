import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { of } from 'rxjs';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';
import { AppAvailabilityMock, MarketMock, NetworkMock } from 'test-config/MockIonicNative';
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
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { Network } from '@ionic-native/network/ngx';
import { IonicModule, IonRouterOutlet } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarMock, DeviceMock, InAppBrowserMock } from '../../test-config/MockIonicNative';
import { AppComponent } from './app.component';
import { AlertService } from './services/utils-services/alert-service';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeAll(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot(),
        IonicStorageModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: Market, useClass: MarketMock },
        { provide: AppAvailability, useClass: AppAvailabilityMock },
        { provide: InAppBrowser, useClass: InAppBrowserMock },
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
          AlertService,
        Navigator
      ]
    }).compileComponents();
  }));

  beforeAll(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    testInstanceCreation(component, AppComponent);
  });

  describe('initializeApp method', () => {
    let spyNav;
    let spyReady;
    let spyGet;

    beforeEach(() => {
      spyReady = spyFunctionWithCallBackThen(component.platform, 'ready', undefined);
      spyNav = spyOn(component.nav, 'navigateForward');
    });
    afterEach(() => {
      expect(spyReady.calls.count()).toEqual(1);
      expect(spyNav.calls.count()).toEqual(1);
      expect(spyGet).toHaveBeenCalledWith('first');
    });

    it('should call get of Storage (UserService) and go to TutoPage on first launch (and set first to false)', () => {
      const spySet = spyOn(component.storage, 'set');
      spyGet = spyFunctionWithCallBackThen(component.storage, 'get', null);
      component.initializeApp();
      expect(spyNav.calls.first().args[0]).toEqual('/tutos');
      expect(spySet.calls.count()).toEqual(1);
    });
    it('should call get of Storage (UserService) and go to HomePage otherwhise', () => {
      spyGet = spyFunctionWithCallBackThen(component.storage, 'get', 'not null');
      component.initializeApp();
      expect(spyNav.calls.first().args[0]).toEqual('/');
    });
  });

  describe('launchExternalApp method', () => {
    it('should open Market if app not installed (Android)', () => {
      spyOnProperty(component.device, 'platform', 'get').and.returnValue('Android');
      const spyCheck = spyFunctionWithCallBackReject(component.appAvailability, 'check');
      const spyOpen = spyOn(component.market, 'open').and.callFake(() => { });
      component.launchExternalApp('ios', 'android', 'app', 'http');
      expect(spyCheck.calls.count()).toEqual(1);
      expect(spyOpen.calls.count()).toEqual(1);
      expect(spyOpen.calls.first().args[0]).toEqual('android');
    });
    it('should call create from InAppBrowser if app not installed (iOS)', () => {
      spyOnProperty(component.device, 'platform', 'get').and.returnValue('iOS');
      const spyCheck = spyFunctionWithCallBackThen(component.appAvailability, 'check', '');
      const spyCreate = spyOn(component.iab, 'create').and.callThrough();
      component.launchExternalApp('ios', 'android', 'app', 'http');
      expect(spyCheck.calls.count()).toEqual(1);
      expect(spyCreate.calls.count()).toEqual(1);
      expect(spyCreate.calls.first().args[0]).toEqual('app');
    });
    it('should call create from InAppBrowser if on browser', () => {
      spyOnProperty(component.device, 'platform', 'get').and.returnValue('');
      const spyCreate = spyOn(component.iab, 'create').and.callThrough();
      component.launchExternalApp('ios', 'android', 'app', 'http');
      expect(spyCreate.calls.count()).toEqual(1);
      expect(spyCreate.calls.first().args[0]).toEqual('http');
    });
  });

  describe('openRootPage method', () => {
    it('should call launchExternalApp if external app', () => {
      const spyLaunch = spyOn(component, 'launchExternalApp').and.callThrough();
      component.openRootPage({ iosSchemaName: 'notNull', component: '/', title: 'Title' });
      expect(spyLaunch.calls.count()).toEqual(1);
    });
    it('should call navigateForward of NavController otherwhise', () => {
      const spyNavigate = spyOn(component.nav, 'navigateForward').and.callThrough();
      component.openRootPage({ iosSchemaName: null, component: '/', title: 'Title' });
      expect(spyNavigate.calls.count()).toEqual(1);
    });
  });

  describe('confirmExitApp method', () => {
    it('should call pop from IonRouterOutlet (if can go back)', () => {
      const spyPop = spyOn(IonRouterOutlet.prototype, 'pop').and.callThrough();
      spyOn(IonRouterOutlet.prototype, 'canGoBack').and.returnValue(true);
      component.confirmExitApp();
      expect(spyPop.calls.count()).toEqual(1);
    });
    it('should call show from Toast (otherwhise and not threshold)', () => {
      const spyShow = spyOn(component.alertService, 'presentToast').and.callThrough();
      spyOnProperty(component.router, 'url', 'get').and.returnValue('home');
      component.confirmExitApp();
      expect(spyShow.calls.count()).toEqual(1);
    });
  });

  describe('backButtonEvent method (should call getElementToClose(x3))', () => {
    let spyGetClose;
    beforeEach(() => {
      component.platform.backButton = of([]);
      spyGetClose = spyOn(component, 'getElementToClose').and.callThrough();
    });
    afterEach(() => {
      expect(spyGetClose.calls.count()).toEqual(3);
    });

    it('should close menu and launch modal to confirm exit app', async function () {
      spyOn(component.menu, 'getOpen').and.returnValue('returned');
      const spyClose = spyOn(component.menu, 'close').and.callThrough();
      const spyConfirmExit = spyOn(component, 'confirmExitApp').and.callThrough();
      component.backButtonEvent();
      await spyClose.and.callThrough();
      expect(spyClose.calls.count()).toEqual(1);
      expect(spyConfirmExit.calls.count()).toEqual(1);
    });
    it('should only call confirmExitApp if error', () => {
      spyFunctionWithCallBackReject(component.menu, 'getOpen');
      component.backButtonEvent();
      // SADELY NO TEST
    });
  });
});

export function spyFunctionWithCallBackThen(usedService: any, method: string, callbackReturn: any) {
  return spyOn(usedService, method).and.callFake(function () {
    return {
      then: function (callback) { return callback(callbackReturn); },
    };
  });
}

export function spyFunctionWithCallBackReject(usedService: any, method: string) {
  return spyOn(usedService, method).and.callFake(function () {
    return {
      then: function (s, error) { return error(); },
    };
  });
}

export function testInstanceCreation(component: any, typeComp: any) {
  expect(component).toBeTruthy();
  expect(component instanceof typeComp).toBeTruthy();
}


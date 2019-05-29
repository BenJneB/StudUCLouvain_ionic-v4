import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';
import {
    AppAvailabilityMock, AppVersionMock, MarketMock, NetworkMock, StatusBarMock, ToastMock
} from 'test-config/MockIonicNative';

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
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { CalendarMock, DeviceMock, InAppBrowserMock } from '../../test-config/MockIonicNative';
import { AppComponent } from './app.component';

fdescribe('MyApp Component', () => {
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
        { provide: StatusBar, useClass: StatusBarMock },
        CacheService,
        {
          provide: CacheStorageService, useFactory: () => {
            return new MockCacheStorageService(null, null);
          }
        },
        { provide: Toast, useClass: ToastMock },
        { provide: Network, useClass: NetworkMock },
        Diagnostic,
        { provide: Calendar, useClass: CalendarMock },
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

    it('should call get of Storage (UserService) and go to TutoPage on first launch (and set first to false)', () => {
      const spySet = spyOn(component.storage, 'set');
      const spyNav = testInitializeRedirectToPage(null);
      expect(spyNav.calls.first().args[0]).toEqual('/tutos');
      expect(spySet.calls.count()).toEqual(1);
    });
    it('should call get of Storage (UserService) and go to HomePage otherwhise', () => {
      const spyNav = testInitializeRedirectToPage('not null');
      expect(spyNav.calls.first().args[0]).toEqual('/');
    });
  });

  function testInitializeRedirectToPage(storageKey: string) {
    const spyReady = spyFunctionWithCallBack(component.platform, 'ready', undefined);
    const spyGet = spyFunctionWithCallBack(component.storage, 'get', storageKey);
    const spyNav = spyOn(component.nav, 'navigateForward');
    component.initializeApp();
    expect(spyReady.calls.count()).toEqual(1);
    expect(spyGet).toHaveBeenCalledWith('first');
    expect(spyNav.calls.count()).toEqual(1);
    return spyNav;
  }
});


function spyFunctionWithCallBack(usedService: any, method: string, callbackReturn: any) {
  return spyOn(usedService, method).and.callFake(function () {
    return {
      then: function (callback) { return callback(callbackReturn); }
    };
  });
}

export function testInstanceCreation(component: any, typeComp: any) {
  expect(component).toBeTruthy();
  expect(component instanceof typeComp).toBeTruthy();
}


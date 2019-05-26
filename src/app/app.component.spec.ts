import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import {
    AppAvailabilityMock, AppVersionMock, MarketMock, MockCacheStorageService, NetworkMock,
    StatusBarMock, ToastMock
} from 'test-config/mocks-ionic';

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
import { AppVersion } from '@ionic-native/app-version/ngx';
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

import { CalendarMock, DeviceMock, InAppBrowserMock } from '../../test-config/mocks-ionic';
import { AppComponent } from './app.component';

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
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

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    testInstanceCreation(component, AppComponent);
  });

});

export function testInstanceCreation(component: any, typeComp: any) {
  expect(component).toBeTruthy();
  expect(component instanceof typeComp).toBeTruthy();
}


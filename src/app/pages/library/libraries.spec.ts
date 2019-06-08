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
import { ModalController } from '@ionic/angular';
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
        fixture = TestBed.createComponent(LibrariesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, LibrariesPage);
    });

    describe('goToLibDetails method', () => {
        it('should call goToDetail with libItem and libraries/details from utilsServices', () => {
            const spyGoToDetail = spyOn(component.utilsServices, 'goToDetail').and.callThrough();
            component.goToLibDetails('libItem');
            expect(spyGoToDetail.calls.count()).toEqual(1);
            expect(spyGoToDetail).toHaveBeenCalledWith('libItem', 'libraries/details');
        });
    });
});

import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
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
import { StudiesPage } from './studies';

fdescribe('Studies Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [StudiesPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                IonicStorageModule.forRoot(),
                FormsModule,
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
        fixture = TestBed.createComponent(StudiesPage);
        component = fixture.componentInstance;
        const spyMenu = spyOn(component.menu, 'enable').and.returnValue('').and.callThrough();
        fixture.detectChanges();
        expect(spyMenu.calls.count()).toEqual(1);
    });

    it('should be created', () => {
        testInstanceCreation(component, StudiesPage);
    });

    describe('removeCourse method', () => {
        it('should call set from Storage', () => {
            const spySet = spyOn(component.storage, 'removeCourse').and.callThrough();
            component.removeCourse();
            expect(spySet.calls.count()).toEqual(1);
        });
    });

    describe('saveCourse method', () => {
        it('should call addFavorite from UtilsService', () => {
            const spySet = spyOn(component.storage, 'removeCourse').and.callThrough();
            component.saveCourse();
            expect(spySet.calls.count()).toEqual(1);
        });
    });

    describe('showPrompt method', () => {
        it('should call showPromptStudies from AlertService', () => {
            const spyShow = spyOn(component.alertService, 'showPromptStudies').and.callThrough();
            component.showPrompt();
            expect(spyShow.calls.count()).toEqual(1);
        });
    });

    describe('checkCourseExisting method', () => {
        it('should call checkExist', () => {
            const spyCheck = spyOn(component, 'checkExist').and.callThrough();
            component.checkCourseExisting(true);
            expect(spyCheck.calls.count()).toEqual(1);
        });
    });

    describe('addCourseFromProgram method', () => {
        it('should call checkCourseExisting', () => {
            const spyCheck = spyOn(component, 'checkCourseExisting').and.callThrough();
            component.addCourseFromProgram();
            expect(spyCheck.calls.count()).toEqual(1);
        });
    });
});

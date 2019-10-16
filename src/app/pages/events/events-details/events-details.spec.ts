import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { ModalControllerMock } from '../../../../../test-config/MockIonicNative';
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
import { EventsDetailsPage } from './events-details';

describe('EventsDetails Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsDetailsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                { provide: ModalController, useClass: ModalControllerMock },
                CacheService,
                {
                    provide: CacheStorageService, useFactory: () => {
                        return new MockCacheStorageService(null, null);
                    }
                },
                Diagnostic,
            ]
        }).compileComponents();
    }));

    let spyGetCurrentNavigation;

    beforeEach(() => {
        spyGetCurrentNavigation = spyOn(Router.prototype, 'getCurrentNavigation')
            .and.returnValue({ extras: { state: { items: {} } } });
        fixture = TestBed.createComponent(EventsDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        // component.event = new EventItem('', '', '', '', '', '', false, false, '', new Date(), new Date(), '', '');
    });

    it('should be created', () => {
        testInstanceCreation(component, EventsDetailsPage);
    });

    describe('openPage method', () => {
        it('should open window', () => {
            const spyOpen = spyOn(window, 'open').and.callFake(() => { });
            component.openPage('url');
            expect(spyOpen.calls.count()).toEqual(1);
            expect(spyOpen).toHaveBeenCalledWith('url', '_blank');
        });
    });

    describe('addFavorite method', () => {
        it('should call addFavorite from UserService and present Toast', () => {
            const spyAdd = spyOn(component.user, 'addFavorite').and.callThrough();
            const spyPresent = spyOn(component.alertService, 'presentToast').and.callThrough();
            component.addFavorite('');
            expect(spyAdd.calls.count()).toEqual(1);
            expect(spyPresent.calls.count()).toEqual(1);
        });
    });
});

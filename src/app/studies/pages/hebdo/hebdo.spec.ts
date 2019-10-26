import { testInstanceCreation } from 'src/app/app.component.spec';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
import { newMockUtilsService } from 'test-config/MockUtilsService';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { newModalControllerMock } from 'test-config/MockIonicNative';
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
import { HebdoPage } from './hebdo';
import { getMockProvider } from 'test-config/Mock';

describe('Hebdo Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HebdoPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                getMockProvider(UtilsService, newMockUtilsService),
                getMockProvider(ModalController, newModalControllerMock),
            ]
        }).compileComponents();
    }));

    let spyGetCurrentNavigation;

    beforeEach(() => {
        spyGetCurrentNavigation = spyOn(Router.prototype, 'getCurrentNavigation')
            .and.returnValue({extras: {state: {items: []}}});
        fixture = TestBed.createComponent(HebdoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, HebdoPage);
    });


    describe('toggleGroup method', () => {
        it('should call toggleGroup from UtilsService', () => {
            const spyToggle = spyOn(component.utilsServices, 'toggleGroup').and.callThrough();
            component.toggleGroup('');
            expect(spyToggle.calls.count()).toEqual(1);
        });
    });

    describe('addToCalendar method', () => {
        it('should call createEventInCalendar from Calendar', () => {
            const spyCreate = spyOn(component.utilsServices, 'createEventInCalendar').and.callThrough();
            component.addToCalendar(
                {
                    'close': () => {
                    }
                },
                '',
            );
            expect(spyCreate.calls.count()).toEqual(1);
        });
    });
});

import { testInstanceCreation } from 'src/app/app.component.spec';
import { EventsService } from 'src/app/services/rss-services/events-service';
import { newMockEventsService } from 'test-config/MockRssService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController, NavParams } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { ModalControllerMock, NavParamsMock } from '../../../../../../test-config/MockIonicNative';
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
import { EventsFilterPage } from './events-filter';
import { getMockProvider } from 'test-config/Mock';

describe('EventsFilter Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsFilterPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                { provide: ModalController, useClass: ModalControllerMock },
                { provide: NavParams, useClass: NavParamsMock },
                getMockProvider(EventsService, newMockEventsService),
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsFilterPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.categories = [{}, {}, {}];
    });

    it('should be created', () => {
        testInstanceCreation(component, EventsFilterPage);
    });

    describe('resetFilters method', () => {
        it('should set all categories to True', () => {
            component.resetFilters();
            component.categories.forEach(category => {
                expect(category).toBeTruthy();
            });
        });
    });

    describe('uncheckAll method', () => {
        it('should set all categories to True', () => {
            component.uncheckAll();
            component.categories.forEach(categories => {
                expect(categories.isChecked).toBeFalsy();
            });
        });
    });
});

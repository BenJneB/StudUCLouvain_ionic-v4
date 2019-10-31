import { testInstanceCreation } from 'src/app/app.component.spec';

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
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
import { SearchModal } from './search';
import { POIService } from 'src/app/services/map-services/poi-service';
import { getMockProvider } from '../../../../../test-config/Mock';

describe('SearchModal of Map Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SearchModal],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                getMockProvider(ModalController, newModalControllerMock),
                POIService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchModal);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, SearchModal);
    });


    describe('search method', () => {
        it('should on from map ?', () => {
            const event_arg = {detail: {value: 'TEST'}};
            const expected = component.items.filter((obj) => {
                return [obj.title, obj.code, obj.address].some(
                    (property) => property.toLowerCase().indexOf(event_arg) > -1
                );
            });
            component.search(event_arg);
            expect(component.items).toEqual(expected);
        });
    });
});

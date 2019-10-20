import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
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
import { ModalInfoPage } from './modal-info';
import { StudentService } from '../../../../services/wso2-services/student-service';
import { newMockWso2Service } from '../../../../../../test-config/MockWso2Services';
import { Wso2Service } from '../../../../services/wso2-services/wso2-service';

describe('ModalInfo Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalInfoPage],
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
                { provide: NavParams, useClass: NavParamsMock },
                StudentService,
                {
                    provide: Wso2Service, useFactory: () => {
                        return newMockWso2Service();
                    }
                },

            ]
        }).compileComponents();
    }));

    let spyGetCurrentNavigation;

    beforeEach(() => {
        spyGetCurrentNavigation = spyOn(Router.prototype, 'getCurrentNavigation')
            .and.returnValue({ extras: { state: { items: {} } } });
        fixture = TestBed.createComponent(ModalInfoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, ModalInfoPage);
    });
});

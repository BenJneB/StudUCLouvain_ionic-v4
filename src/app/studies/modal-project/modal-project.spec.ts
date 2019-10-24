import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { spyFunctionWithCallBackThen, testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalController, NavParams } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { ModalControllerMock, NavParamsMock } from 'test-config/MockIonicNative';
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
import { ModalProjectPage } from './modal-project';
import { newMockStudiesService } from 'test-config/MockStudiesService';
import { StudiesService } from 'src/app/services/studies-services/studies-service';
import { getMockProvider } from 'test-config/Mock';

describe('ModalProject Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalProjectPage],
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
                {provide: NavParams, useClass: NavParamsMock},
                getMockProvider(StudiesService, newMockStudiesService),
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalProjectPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, ModalProjectPage);
    });

    describe('closeModal method', () => {
        it('should call setProject from StudiesService, set adeProject and finally dismiss Modal', () => {
            const spySetProject = spyFunctionWithCallBackThen(
                component.studiesService,
                'setProject',
                {}
            );
            const spySet = spyOn(component.storage, 'set').and.callThrough();
            component.sessionId = 0;
            component.closeModal({ 'id': 0 });
            expect(spySetProject.calls.count()).toEqual(1);
            expect(spySet.calls.count()).toEqual(1);
            expect(component.viewCtrl.dismiss.calls.count()).toEqual(1);
        });
    });

    describe('getProjects method', () => {
        it('should get Projects from StudiesService', () => {
            const spyGet = spyFunctionWithCallBackThen(
                component.studiesService,
                'getProjects',
                'RESULT'
            );
            component.getProjects({ 'id': '0' });
            expect(spyGet.calls.count()).toEqual(1);
            expect(component.projects).toEqual('RESULT');
        });
    });
});

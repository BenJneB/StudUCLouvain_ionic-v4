import { CacheService } from 'ionic-cache';
import { CacheStorageService } from 'ionic-cache/dist/cache-storage';
import { testInstanceCreation } from 'src/app/app.component.spec';
import { MockCacheStorageService } from 'test-config/MockCacheStorageService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule, ModalController } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { InAppBrowserMock, ModalControllerMock } from '../../../../test-config/MockIonicNative';
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
import { UtilsService } from '../../services/utils-services/utils-services';
import { newMockConnectivityService, newMockUtilsService } from '../../../../test-config/MockUtilsService';
import { newMockStudiesService } from '../../../../test-config/MockStudiesService';
import { StudiesService } from '../../services/studies-services/studies-service';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { Wso2Service } from '../../services/wso2-services/wso2-service';
import { newMockStudentService, newMockWso2Service } from '../../../../test-config/MockWso2Services';
import { StudentService } from '../../services/wso2-services/student-service';

describe('Studies Component', () => {
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
                CacheService,
                {
                    provide: CacheStorageService, useFactory: () => {
                        return new MockCacheStorageService(null, null);
                    }
                },
                {
                    provide: ConnectivityService, useFactory: () => {
                        return newMockConnectivityService();
                    }
                },                {
                    provide: UtilsService, useFactory: () => {
                        return newMockUtilsService();
                    }
                },
                {
                    provide: StudiesService, useFactory: () => {
                        return newMockStudiesService();
                    }
                },
                {
                    provide: Wso2Service, useFactory: () => {
                        return newMockWso2Service();
                    }
                },
                {
                    provide: StudentService, useFactory: () => {
                        return newMockStudentService();
                    }
                },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StudiesPage);
        component = fixture.componentInstance;
        spyOn(component.menu, 'enable').and.returnValue('').and.callThrough();
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, StudiesPage);
    });

    describe('removeCourse method', () => {
        it('should call set from Storage', () => {
            const spySet = spyOn(component.storage, 'set').and.callThrough();
            component.listCourses = [''];
            component.removeCourse('');
            expect(spySet.calls.count()).toEqual(1);
        });
    });

    describe('saveCourse method', () => {
        it('should call set from Storage', () => {
            const spySet = spyOn(component.storage, 'set').and.callThrough();
            component.listCourses = [''];
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
        // TO TEST !!
        it('should call checkExist', () => {
            const spyCheck = spyOn(component, 'checkExist').and.callThrough();
            component.project = { name: '' };
            component.checkCourseExisting(false);
            expect(spyCheck.calls.count()).toEqual(1);
        });
    });

    describe('addCourseFromProgram method', () => {
        it('should call checkCourseExisting', () => {
            const spyCheck = spyOn(component, 'checkCourseExisting').and.callThrough();
            component.listCourses = [''];
            component.addCourseFromProgram();
            expect(spyCheck.calls.count()).toEqual(1);
        });
    });
});

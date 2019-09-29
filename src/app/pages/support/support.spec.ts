import { spyFunctionWithCallBackThen, testInstanceCreation } from 'src/app/app.component.spec';
import { LoaderService } from 'src/app/services/utils-services/loader-service';
import { UtilsService } from 'src/app/services/utils-services/utils-services';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';
import { newMockUtilsService } from 'test-config/MockUtilsService';
import { newMockRepertoireService } from 'test-config/MockWso2Services';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

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
import { SupportPage } from './support';

describe('Support Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SupportPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: RepertoireService, useFactory: () => {
                        return newMockRepertoireService();
                    }
                },
                {
                    provide: UtilsService, useFactory: () => {
                        return newMockUtilsService();
                    }
                },
                LoaderService,
                InAppBrowser
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SupportPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, SupportPage);
    });

    describe('update method', () => {
        it('should present loader before searchEmployees', async () => {
            const spyLoad = spyFunctionWithCallBackThen( // TODO: not function with then. async method, have to spy on await call
                component.loader,
                'present',
                {}
            );
            const spySearch = spyOn(component, 'searchEmployees').and.callThrough();
            component.firstname = 'first';
            component.lastname = 'last';
            await component.update();
            expect(spyLoad.calls.count()).toEqual(1);
            expect(spySearch.calls.count()).toEqual(1);
        });
    });

    describe('toggleGroup method', () => {
        it('should call toggleGroup from UtilsService', () => {
            const spyToggle = spyOn(component.utilsServices, 'toggleGroup').and.callThrough();
            component.toggleGroup('');
            expect(spyToggle.calls.count()).toEqual(1);
        });
    });

    describe('goToEmpDetails method', () => {
        it('should call goToDetail from UtilsService', () => {
            const spyGo = spyOn(component.utilsServices, 'goToDetail').and.callFake(() => { });
            component.goToEmpDetails();
            expect(spyGo.calls.count()).toEqual(1);
        });
    });

    describe('openURL method', () => {
        it('should call create from InAppBrowser', () => {
            const spyCreate = spyOn(component.iab, 'create').and.callThrough();
            component.openURL('');
            expect(spyCreate.calls.count()).toEqual(1);
        });
    });

    describe('searchEmployees method', () => {
        it('should call searchEmployees from RepertoireService and dismiss loader', async () => {
            const spySearch = spyFunctionWithCallBackThen( // TODO: not function with then. async method, have to spy on await call
                component.repService,
                'searchEmployees',
                {}
            );
            const spyDismiss = spyOn(component.loader, 'dismiss').and.callThrough();
            await component.searchEmployees([], []);
            expect(spySearch.calls.count()).toEqual(1);
            expect(component.searching).toBeFalsy();
            expect(spyDismiss.calls.count()).toEqual(1);
        });
    });
});

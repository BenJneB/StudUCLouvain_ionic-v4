import { testInstanceCreation } from 'src/app/app.component.spec';
import { RepertoireService } from 'src/app/services/wso2-services/repertoire-service';
import { newMockRepertoireService } from 'test-config/MockWso2Services';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
import { EmployeeDetailsPage } from './employee-details';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { newMockConnectivityService } from 'test-config/MockUtilsService';
import { getMockProvider } from 'test-config/Mock';

describe('EmployeeDetails Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmployeeDetailsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                getMockProvider(RepertoireService, newMockRepertoireService),
                getMockProvider(ConnectivityService, newMockConnectivityService),
            ]
        }).compileComponents();
    }));

    let spyGetCurrentNavigation;

    beforeEach(() => {
        spyGetCurrentNavigation = spyOn(Router.prototype, 'getCurrentNavigation')
            .and.returnValue({ extras: { state: { items: { departments: {} } } } });
        fixture = TestBed.createComponent(EmployeeDetailsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, EmployeeDetailsPage);
    });

    describe('openPage method', () => {
        it('should open window', () => {
            const spyOpen = spyOn(window, 'open').and.callFake(() => {
            });
            component.openPage('url');
            expect(spyOpen.calls.count()).toEqual(1);
            expect(spyOpen).toHaveBeenCalledWith('url', '_blank');
        });
    });
});

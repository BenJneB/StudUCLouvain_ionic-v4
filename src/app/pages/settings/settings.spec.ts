import { testInstanceCreation } from 'src/app/app.component.spec';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
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
import { SettingsPage } from './settings';
import { TransService } from 'src/app/services/utils-services/trans-services';

describe('Param Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettingsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
                IonicStorageModule.forRoot(),
            ],
            providers: [
                TransService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, SettingsPage);
    });

    describe('campus_choice method', () => {
        it('should call campusChoiceAlert from AlertService', () => {
            const spyCampusAlert = spyOn(component.alertService, 'campusChoiceAlert').and.callThrough();
            component.campus_choice();
            expect(spyCampusAlert.calls.count()).toEqual(1);
        });
    });

    describe('language_choice method', () => {
        it('should call languageAlert from AlertService', () => {
            const spyLangAlert = spyOn(component.alertService, 'languageAlert').and.callThrough();
            component.language_choice();
            expect(spyLangAlert.calls.count()).toEqual(1);
        });
    });

    describe('openTuto method', () => {
        it('should call navigateForward from NavController', () => {
            const spyNavigate = spyOn(component.navCtrl, 'navigateForward').and.callFake(() => { });
            component.openTuto();
            expect(spyNavigate.calls.count()).toEqual(1);
        });
    });
});

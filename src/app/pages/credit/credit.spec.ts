import { testInstanceCreation } from 'src/app/app.component.spec';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ModalController } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import {
    AppVersionMock, InAppBrowserMock, ModalControllerMock
} from '../../../../test-config/mocks-ionic';
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
import { CreditPage } from './credit';

describe('Credit Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreditPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                { provide: ModalController, useClass: ModalControllerMock },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: AppVersion, useClass: AppVersionMock },
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(CreditPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    /*     beforeEach(() => {
            fixture = TestBed.createComponent(CreditPage);
            component = fixture.componentInstance;
            fixture.detectChanges();
        }); */

    it('should be created', () => {
        testInstanceCreation(component, CreditPage);
    });
});

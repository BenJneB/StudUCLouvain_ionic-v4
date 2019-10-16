import { SplashScreenMock } from 'test-config/MockIonicNative';
import { newMockUtilsService } from 'test-config/MockUtilsService';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
/*
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
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController, IonicModule } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateModule } from '@ngx-translate/core';

import { MockAlertController } from '../../../test-config/MockAlert';
import { InAppBrowserMock } from '../../../test-config/MockIonicNative';
import { testInstanceCreation } from '../app.component.spec';
import { UtilsService } from '../services/utils-services/utils-services';
import { HomePage } from './home.page';

describe('Home Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [HomePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                IonicStorageModule.forRoot(),
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [
                {
                    provide: UtilsService, useFactory: () => {
                        return newMockUtilsService();
                    }
                },
                { provide: InAppBrowser, useClass: InAppBrowserMock },
                { provide: SplashScreen, useClass: SplashScreenMock },
                { provide: AlertController, useClass: MockAlertController },
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, HomePage);
    });

    describe('changePage method', () => {
        it('should call launchExternalApp of UtilsService if external application', () => {
            const spyLaunch = spyOn(component.utilsServices, 'launchExternalApp').and.callThrough();
            component.utilsServices.device = { 'platform': 'iOS' };
            component.changePage({ iosSchemaName: 'name' });
            expect(spyLaunch.calls.count()).toEqual(1);
        });

        it('should call navigateForward of NavController otherwhise', () => {
            const spyNavigate = spyOn(component.nav, 'navigateForward').and.callThrough();
            component.changePage({ iosSchemaName: null, component: '/' });
            expect(spyNavigate.calls.count()).toEqual(1);
        });
    });

    describe('updateCampus method', () => {
        it('should call addCampus of UserService', () => {
            function add() {
                return {
                    subscribe: (success: Function) => {
                        success();
                    }
                };
            }
            const spyAdd = spyOn(component.userS, 'addCampus').and.callFake(add).and.callThrough();
            component.updateCampus();
            expect(spyAdd.calls.count()).toEqual(1);
            expect(spyAdd.calls.first().args[0]).toEqual('');
        });
    });

    describe('openURL method', () => {
        it('should call create of InAppBrowser', () => {
            _testCreateInAppBrowser(component);
        });
    });

    describe('openUCL method', () => {
        it('should call create of InAppBrowser', () => {
            _testCreateInAppBrowser(component);
        });
    });

    describe('ionViewDidEnter method', () => {
        it('should call setTimeout of NodeJS', () => {
            const spySetTimeout = spyOn(window, 'setTimeout').and.callThrough();
            component.ionViewDidEnter();
            expect(spySetTimeout.calls.count()).toEqual(1);
        });
    });

    describe('emergency method', () => {
        it('should ge tEmergencyTexts', () => {
            const spyGetEmergencyTexts = spyOn(component, 'getEmergencyTexts').and.callThrough();
            component.emergency();
            expect(spyGetEmergencyTexts.calls.count()).toEqual(1);
        });
        it('should get EmergencyMsg', () => {
            const spyGetEmergencyMsg = spyOn(component, 'getEmergencyMsg').and.callThrough();
            component.emergency();
            expect(spyGetEmergencyMsg.calls.count()).toEqual(1);
        });
        it('should call create and present of AlertController', () => {
            const spyCreate = spyOn(component.alertCtrl, 'create').and.callThrough();
            component.emergency();
            expect(spyCreate.calls.count()).toEqual(1);
            // TODO: Test present
        });
    });
});
function _testCreateInAppBrowser(component: any) {
    const spyCreate = spyOn(component.iab, 'create').and.callFake(() => { });
    component.openUCL('url');
    expect(spyCreate.calls.count()).toEqual(1);
    expect(spyCreate.calls.first().args[0]).toEqual('url');
}


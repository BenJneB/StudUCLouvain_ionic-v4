import { testInstanceCreation } from 'src/app/app.component.spec';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';

import { SplashScreenMock } from 'test-config/MockIonicNative';
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
import { TutoPage } from './tuto';

describe('Tuto Component', () => {
    let fixture;
    let component;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TutoPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                IonicModule.forRoot(),
                TranslateModule.forRoot(),
                RouterTestingModule,
            ],
            providers: [
                {provide: SplashScreen, useClass: SplashScreenMock},
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TutoPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        testInstanceCreation(component, TutoPage);
    });

    describe('ionViewDidEnter method', () => {
        it('should call setTimeout of NodeJS', () => {
            const spySetTimeout = spyOn(window, 'setTimeout').and.callThrough();
            component.ionViewDidEnter();
            expect(spySetTimeout.calls.count()).toEqual(1);
        });
    });

    describe('goToHome method', () => {
        it('should call navigateForward of NavController', () => {
            const spyNav = spyOn(component.navCtrl, 'navigateForward').and.callFake(() => {
            });
            component.goToHome();
            expect(spyNav.calls.count()).toEqual(1);
            expect(spyNav.calls.first().args[0]).toEqual(['/home']);
        });
    });
});

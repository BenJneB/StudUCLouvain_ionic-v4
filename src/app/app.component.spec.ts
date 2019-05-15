/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors : Benjamin Daubry & Bruno Marchesini and Jérôme Lemaire & Corentin Lamy
    Date : 2018-2019
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
import { IonicModule, MenuController, Platform, AlertController,LoadingController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { Market } from '@ionic-native/market';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
/*import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppAvailability } from '@ionic-native/app-availability';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Device } from '@ionic-native/device';
import { IonicStorageModule  } from '@ionic/storage';*/

//import { UserService } from '../providers/utils-services/user-service';


import { AppComponent } from './app.component';
import { UserService } from './services/utils-services/user-service';
import { Wso2Service } from './services/wso2-services/wso2-service';

/*export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}*/

describe('MyApp Component', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()
        /*TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [Http]
                    }
                }),
        IonicStorageModule.forRoot(),
       */
      ],
      providers: [
        AlertController,
        LoadingController,
        Market,
        AppAvailability,
        InAppBrowser,
        Device,
        /*AppAvailability,
        InAppBrowser,
        Device,
        UserService*/
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof AppComponent).toBe(true);
  });

});

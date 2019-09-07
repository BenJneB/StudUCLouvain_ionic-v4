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
import { CacheModule } from 'ionic-cache';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { GoogleMaps } from '@ionic-native/google-maps';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SecureStorage } from '@ionic-native/secure-storage/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Toast } from '@ionic-native/toast/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { POIService } from './services/map-services/poi-service';
import { EventsService } from './services/rss-services/events-service';
import { NewsService } from './services/rss-services/news-service';
import { RssService } from './services/rss-services/rss-service';
import { SportsService } from './services/rss-services/sports-service';
import { AdeService } from './services/studies-services/ade-service';
import { CourseService } from './services/studies-services/course-service';
import { StudiesService } from './services/studies-services/studies-service';
import { AlertService } from './services/utils-services/alert-service';
import { ConnectivityService } from './services/utils-services/connectivity-service';
import { FacService } from './services/utils-services/fac-service';
import { TransService } from './services/utils-services/trans-services';
import { UserService } from './services/utils-services/user-service';
import { UtilsService } from './services/utils-services/utils-services';
import { LibrariesService } from './services/wso2-services/libraries-service';
import { RepertoireService } from './services/wso2-services/repertoire-service';
import { StudentService } from './services/wso2-services/student-service';
import { Wso2Service } from './services/wso2-services/wso2-service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  exports: [
    TranslateModule
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CacheModule.forRoot({ keyPrefix: 'UCL-cache' }),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [AppComponent],
  entryComponents: [

  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorHandler },
    AppAvailability,
    ConnectivityService,
    CourseService,
    StudiesService,
    EventsService,
    AlertService,
    TransService,
    InAppBrowser,
    Market,
    POIService,
    UserService,
    Device,
    SplashScreen,
    StatusBar,
    GoogleMaps,
    Geolocation,
    Network,
    Calendar,
    NewsService,
    RssService,
    LibrariesService,
    AdeService,
    CourseService,
    Wso2Service,
    NativeGeocoder,
    SportsService,
    RepertoireService,
    StudentService,
    UtilsService,
    FacService,
    SQLite,
    SecureStorage,
    AppVersion,
    Diagnostic,
    Toast,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
})
export class AppModule { }

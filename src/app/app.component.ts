import { UtilsService } from './services/utils-services/utils-services';
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

import { Component, ViewChildren, QueryList } from '@angular/core';
import {
  MenuController,
  NavController,
  Platform,
  LoadingController,
  ActionSheetController,
  PopoverController,
  ModalController,
  IonRouterOutlet
} from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from './services/utils-services/user-service';
import { Wso2Service } from './services/wso2-services/wso2-service';
import { CacheService } from 'ionic-cache';
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';
import { Page } from './entity/page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})


export class AppComponent {
  rootPage = '';
  alertPresented: any;
  page: any;
  homePage;
  checked = false;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  campusPages: Array<Page>;
  studiePages: Array<Page>;
  toolPages: Array<Page>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public market: Market,
    private appAvailability: AppAvailability,
    private iab: InAppBrowser,
    private device: Device,
    private popoverCtrl: PopoverController,
    private user: UserService,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private wso2Service: Wso2Service,
    public cache: CacheService,
    private router: Router,
    private toast: Toast,
    private nav: NavController,
    private utilsServices: UtilsService
  ) {
    this.initializeApp();
  }

  private getAllPages() {
    const nullSchemas = this.utilsServices.nullSchemas;
    const nullUrls = this.utilsServices.nullUrls;
    this.homePage = this.utilsServices.getPageStruct(this.getPageData('HOME', 'home', 'home', nullSchemas, nullUrls));
    this.campusPages = this.getOtherPages(false, nullSchemas, nullUrls);
    this.studiePages = this.getOtherPages(true, nullSchemas, nullUrls);
    this.getToolsPages(nullSchemas, nullUrls);
  }

  private getToolsPages(nullSchemas: { ios: any; android: any; }, nullUrls: { app: any; http: any; }) {
    const pages = ['guindaille', 'map', 'resto', 'mobility', 'settings', 'credits'];
    const toolData = [];
    for (const page of pages) {
      if (page === 'resto') {
        toolData.push(this.getPageData(
          page.toUpperCase(),
          page, page,
          { ios: 'id1156050719', android: 'com.apptree.resto4u' },
          { app: 'apptreeresto4u://', http: 'https://uclouvain.be/fr/decouvrir/resto-u' }
        ));
      } else {
        toolData.push(this.getPageData(page.toUpperCase(), page, page, nullSchemas, nullUrls));
      }
    }
    this.toolPages = [];
    for (const page of toolData) {
      this.toolPages.push(this.utilsServices.getPageStruct(page));
    }
  }

  private getOtherPages(studies: boolean, nullSchemas: { ios: string; android: string; }, nullUrls: { app: string; http: string; }) {
    const pages = studies ? ['studies', 'libraries', 'support'] : ['news', 'events', 'sports'];
    const datas = [];
    for (const page of pages) {
      datas.push(this.getPageData(page.toUpperCase(), page, page, nullSchemas, nullUrls));
    }
    const pagesR = [];
    for (const page of datas) {
      pagesR.push(this.utilsServices.getPageStruct(page));
    }
    return pagesR;
  }

  private getPageData(title: string, route: string, icon: string, nullSchemas: any, nullUrls: any) {
    return { title: title, route: route, icon: icon, schemas: nullSchemas, urls: nullUrls };
  }

  initializeApp() {
    this.user.getFavorites();
    this.alertPresented = false;
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
    this.getAllPages();
    this.platform.ready().then(() => {
      this.wso2Service.getToken();
      this.translateService.setDefaultLang('fr');
     this.getLanguage();
      this.cache.setDefaultTTL(60 * 60 * 2);
      this.cache.setOfflineInvalidate(false);
    //  this.user.storage.set('first',null);
     this.user.storage.get('first').then((data) => {
       if (data === null) {
         this.rootPage = 'TutoPage';
         this.user.storage.set('first', false);
       } else {
         this.rootPage = 'HomePage';
       }
     });
   });
  }

  private getLanguage() {
    this.user.storage.get('lan').then((data) => {
      if (data != null) {
        this.translateService.use(data);
      } else {
        this.translateService.use('fr');
      }
    });
  }

  async getElementToClose(element: any) {
    try {
      const elem = await element.getTop();
      if (elem) {
          elem.dismiss();
          return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  backButtonEvent() {
    this.platform.backButton.subscribe(async () => {
        this.getElementToClose(this.actionSheetCtrl);
        this.getElementToClose(this.popoverCtrl);
        this.getElementToClose(this.modalCtrl);
        try {
            const element = await this.menu.getOpen();
            if (element) {
                this.menu.close();
                return;
            }
        } catch (error) {
          console.log(error);
        }
        this.confirmExitApp();
    });
}

  private confirmExitApp() {
    this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
      if (outlet && outlet.canGoBack()) {
        outlet.pop();
      } else
      if (this.router.url === 'home') {
        if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
          navigator['app'].exitApp(); //  work in ionic 4
        } else {
          this.toast.show(`Press back again to exit App.`, '2000', 'center')
            .subscribe(toast => {
            });
          this.lastTimeBackPress = new Date().getTime();
        }
      }
    });
  }

  openRootPage(page) {
    const activeUrl = this.router.url;

   //  close the menu when clicking a link from the menu
    this.menu.close();
    this.page = page;

    if (page.iosSchemaName !== null && page.androidPackageName !== null) {
      this.launchExternalApp(page.iosSchemaName, page.androidPackageName, page.appUrl, page.httpUrl);
    } else {
      this.nav.navigateForward([page.component, { title: page.title }]);
    }
  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string) {
    let app: string;
    let check: string;
    if (this.device.platform === 'iOS') {
      app = iosSchemaName;
      check = appUrl;
    } else
    if (this.device.platform === 'Android') {
      app = androidPackageName;
      check = app;
    } else {
      const browser = this.iab.create(httpUrl, '_system');
      browser.close();
    }
    this.appAvailability.check(check).then(
      () => {//  success callback
        const browser = this.iab.create(appUrl, '_system');
        browser.close();
      },
      () => {//  error callback
        this.market.open(app);
      });
  }
}

/*
    Copyright (c)  Université catholique Louvain.  All rights reserved
    Authors :  Jérôme Lemaire and Corentin Lamy
    Date : July 2017
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

import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MenuController, NavController, Platform, AlertController,LoadingController, ActionSheetController, PopoverController, ModalController, IonRouterOutlet } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Market } from '@ionic-native/market/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { TranslateService } from '@ngx-translate/core';
import { HomePage } from './home/home.page';

import { UserService } from './services/utils-services/user-service';
import { Wso2Service } from './services/wso2-services/wso2-service';
import { CacheService } from "ionic-cache";
import { Router } from '@angular/router';
import { Toast } from '@ionic-native/toast/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})


export class AppComponent {
  rootPage = '';
  alertPresented: any;
  page: any;
  homePage;
  checked=false;
  lastTimeBackPress = 0;
  timePeriodToExit = 2000;
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  campusPages: Array<{
    title: string,
    component: string, 
    icon: string,
    iosSchemaName: string, androidPackageName: string,
    appUrl: string, httpUrl: string
  }>;
  studiePages: Array<{
    title: string,
    component: string, 
    icon: string,
    iosSchemaName: string, androidPackageName: string,
    appUrl: string, httpUrl: string
  }>;
  toolPages: Array<{
    title: string,
    component: string, 
    icon: string,
    iosSchemaName: string, androidPackageName: string,
    appUrl: string, httpUrl: string
  }>;

  constructor(public platform: Platform,
    public menu: MenuController,
    public market: Market,
    private appAvailability : AppAvailability,
    private iab: InAppBrowser,
    private device: Device,
    private popoverCtrl: PopoverController,
    private user: UserService,
    private statusBar: StatusBar,
    public modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    public translateService: TranslateService,
    public loadingCtrl: LoadingController,
    private wso2Service : Wso2Service,
    public cache: CacheService,
    private router: Router,
    private toast: Toast,
    private nav: NavController
  ) {
    this.user.getCampus();
    this.alertPresented = false;
    this.initializeApp();

    this.homePage = this.getPageData('MENU.HOME', '/home', './assets/img/home.png', { ios: null, android: null }, { app: null, http: null });
    this.campusPages = [
      this.getPageData('MENU.NEWS', '/news', './assets/img/news.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.EVENTS', '/events', './assets/img/event.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.SPORTS', '/sports', './assets/img/sport.png', { ios: null, android: null }, { app: null, http: null }),
    ];
    this.studiePages = [
      this.getPageData('MENU.STUDIES', '/studies', './assets/img/études.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.LIBRARIES', '/libraries', './assets/img/biblio.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.HELP', '/support', './assets/img/support.png', { ios: null, android: null }, { app: null, http: null }),
    ];
    this.toolPages = [
      this.getPageData('MENU.PARTY', '/guindaille', './assets/img/g2.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.MAP', '/map', './assets/img/cartes.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData(
        'MENU.RESTAURANT',
        'R', 
        './assets/img/resto.png', 
        { ios: 'id1156050719', android: 'com.apptree.resto4u' }, 
        { app: 'apptreeresto4u://', http: 'https://uclouvain.be/fr/decouvrir/resto-u' }
      ),
      this.getPageData('MENU.MOBILITY', '/mobility', './assets/img/mobilité.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.PARAM', '/settings', './assets/img/setting.png', { ios: null, android: null }, { app: null, http: null }),
      this.getPageData('MENU.CREDITS', '/credit', './assets/img/signature.png', { ios: null, android: null }, { app: null, http: null }),
    ];
    platform.ready().then(() => {
    	 this.wso2Service.getToken();
      translateService.setDefaultLang('fr');
      this.user.storage.get('lan').then((data) =>
      {
        if(data!=null) translateService.use(data);
        else translateService.use('fr');
       });
      cache.setDefaultTTL(60 * 60 * 2);
      cache.setOfflineInvalidate(false);
      //this.user.storage.set('first',null);
      this.user.storage.get('first').then((data) =>
      {
      	if(data==null) {
      		this.rootPage = 'TutoPage';
      		this.user.storage.set('first',false);
      	}
      	else this.rootPage = 'HomePage';
      })

    })
  }

  private getPageData(title: string, route: string, icon: string, schemas: any, urls: any) {
    return {
      title: title,
      component: route, 
      icon: icon,
      iosSchemaName: schemas['ios'], androidPackageName: schemas['android'],
      appUrl: urls['app'], httpUrl: urls['http']
    };
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
    });
  }

    async getElementToClose(element: any){
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

          this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
              if (outlet && outlet.canGoBack()) {
                  outlet.pop();
              } else if (this.router.url === 'home') {
                  if (new Date().getTime() - this.lastTimeBackPress < this.timePeriodToExit) {
                      navigator['app'].exitApp(); // work in ionic 4

                  } else {
                      this.toast.show(
                          `Press back again to exit App.`,
                          '2000',
                          'center')
                          .subscribe(toast => {

                          });
                      this.lastTimeBackPress = new Date().getTime();
                  }
              }
          });
      });
    // Confirm exit
    /* this.platform.registerBackButtonAction(() => {

        let activePortal = this.ionicApp._loadingPortal.getActive() ||
           this.ionicApp._modalPortal.getActive() ||
           this.ionicApp._toastPortal.getActive() ||
            this.ionicApp._overlayPortal.getActive();

        if (activePortal) {
            activePortal.dismiss();
            return
        }
        else if (this.menu.isOpen()) { // Close menu if open
            this.menu.close();
            return
        }
        if (this.nav.length() == 1) {
          this.confirmExitApp();
        } else {
          this.nav.pop();
        }

    }); */
  }


/* 
  confirmExitApp() {
    let activeVC = this.nav.getActive();
    let page = activeVC.instance;
    if(page instanceof HomePage){
      if(!this.alertPresented){
        this.alertPresented = true;
        let confirmAlert = this.alertCtrl.create({
            header: "Fermeture",
            message: "Désirez-vous quitter l'application ?",
            buttons: [
                {
                    text: 'Annuler',
                    handler: () => {
                      this.alertPresented = false;
                    }
                },
                {
                    text: 'Quitter',
                    handler: () => {
                        this.platform.exitApp();
                    }
                }
            ]
        }).then(alert => alert.present());
    }confirmExitApp
  }
  else this.openRootPage(this.homePage);
} */

  openRootPage(page) {
    let activeUrl = this.router.url;

    // close the menu when clicking a link from the menu
    this.menu.close();
    this.page = page;

    if(!((activeUrl == this.homePage.url) && page == this.homePage)){
	    if(page.iosSchemaName != null && page.androidPackageName != null){
	        this.launchExternalApp(page.iosSchemaName, page.androidPackageName, page.appUrl, page.httpUrl);
	    }
	    else {if(page != this.homePage){

      		this.nav.navigateForward([page.component, {title: page.title}]);
  		}}
    }

  }

  launchExternalApp(iosSchemaName: string, androidPackageName: string, appUrl: string, httpUrl: string) {
	  let app: string;
    	//let storeUrl:string;
    	let check:string;
  	if (this.device.platform === 'iOS') {
  		app = iosSchemaName;
      //storeUrl=httpUrl;
      	check=appUrl;
  	} else if (this.device.platform === 'Android') {
  		app = androidPackageName;
      //storeUrl= 'market://details?id='+ app;
      	check=app;

  	} else {
  		const browser = this.iab.create(httpUrl, '_system');
      browser.close();
  	}
  	this.appAvailability.check(check).then(
  		() => { // success callback
  			const browser = this.iab.create(appUrl, '_system');
        browser.close();
  		},
  		() => { // error callback
  			this.market.open(app);
  		}
  	);
  }
}

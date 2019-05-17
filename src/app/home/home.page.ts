/*
import { Component, ViewChild } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Market } from '@ionic-native/market/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController, IonContent, LoadingController, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

import { AppComponent } from '../app.component';
import { UserService } from '../services/utils-services/user-service';
import { UtilsService } from '../services/utils-services/utils-services';
import { StudentService } from '../services/wso2-services/student-service';

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
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',

})
export class HomePage {

  @ViewChild('home') content: IonContent;


  title = 'Stud.UCLouvain';
  shownGroup = null;
  where = '';
  myApp: AppComponent;

  /*Create an object Page for each feature of our application display in the home page*/

  libraryPage = { title: 'MENU.LIBRARY', component: '/libraries',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null };

  newsPage = { title: 'MENU.NEWS', component: '/news',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null };

  eventPage = { title: 'MENU.EVENTS', component: '/events',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null  };

  sportPage = { title: 'MENU.SPORTS', component: '/sports',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null  };

  studiesPage = { title: 'MENU.STUDIES', component: '/studies',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null  };

  helpDeskPage = { title: 'MENU.HELP', component: '/support',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null };

  mapPage = { title: 'MENU.MAP', component: '/map',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null  };

  guindaillePage = { title: 'MENU.GUINDAILLE', component: '/guindaille',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null  };

  paramPage = { title: 'MENU.SETTINGS', component: '/settings',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null  };

  restoPage = { title: 'MENU.RESTAURANT', component: '/rest',
    iosSchemaName: 'id1156050719',
    androidPackageName: 'com.apptree.resto4u',
    appUrl: 'apptreeresto4u://',
    httpUrl: 'https://uclouvain.be/fr/decouvrir/resto-u' };

  mobilityPage = { title: 'MENU.MOBILITY', component: '/mobility',
    iosSchemaName: null, androidPackageName: null,
    appUrl: null, httpUrl: null };


  constructor(
              public userS:UserService,
              public nav: NavController,
              private iab: InAppBrowser,
              private alertCtrl: AlertController,
              private translateService: TranslateService,
              public market: Market,
              public loadingCtrl: LoadingController,
              public studentService: StudentService,
              public splashscreen: SplashScreen,
              private utilsServices: UtilsService
            )
  {
      this.where = '';
      document.title = this.title;
     // this.userS.removeCampus('');
  }

  /*Set the title*/
  ionViewDidEnter() {
    setTimeout(() => {
      this.splashscreen.hide();
    },1000);
  }

  /*Update the public variable campus for the user*/
  updateCampus() {
    this.userS.addCampus(this.where);
  }

  /*Change page when click on a page of the home of launchExternalApp if it's the resto U*/
  changePage(page) {
    if (page.iosSchemaName !== null && page.androidPackageName !== null) {
      this.utilsServices.launchExternalApp(page);
    } else {
      this.nav.navigateForward([page.component]);
    }
  }

  /*Open the URL for the social media of the UCL*/
  public openURL(url: string) {
    this.iab.create(url, '_system');
   // fab.close();
  }
  public openUCL(url: string) {
    this.iab.create(url, '_system');
  }

  /*action when click on the floating urgency button, display the text to help the user in an alert*/
  emergency() {
    let close: string;
    this.translateService.get('HOME.CLOSE').subscribe((res: string) => {close = res; });
    let urg: string;
    this.translateService.get('HOME.URG').subscribe((res: string) => {urg = res; });
    let msg1, msg2, msg3, msg4, msg5, msg6, msg7, msg8, msg9: string;
    this.translateService.get('GUINDAILLE.HELP1').subscribe((res: string) => {msg1 = res; });
    this.translateService.get('GUINDAILLE.HELP2').subscribe((res: string) => {msg2 = res; });
    this.translateService.get('GUINDAILLE.HELP3').subscribe((res: string) => {msg3 = res; });
    this.translateService.get('GUINDAILLE.HELP4').subscribe((res: string) => {msg4 = res; });
    this.translateService.get('GUINDAILLE.HELP5').subscribe((res: string) => {msg5 = res; });
    this.translateService.get('GUINDAILLE.HELP6').subscribe((res: string) => {msg6 = res; });
    this.translateService.get('GUINDAILLE.HELP7').subscribe((res: string) => {msg7 = res; });
    this.translateService.get('GUINDAILLE.HELP8').subscribe((res: string) => {msg8 = res; });
    this.translateService.get('GUINDAILLE.HELP9').subscribe((res: string) => {msg9 = res; });
    let out: string;
    this.translateService.get('GUINDAILLE.HELP18').subscribe((res: string) => {out = res; });
    let alert = this.alertCtrl.create({
      header: urg,
      message: '<p> <strong>'
      + msg1
      + '</strong>: <br><font size=\' +1\'><a href=\'tel:010 47 22 22\'>010 47 22 22</a></font> </p> <p><strong>'
      + msg2
      + '</strong>: <br><font size=\' +1\'><a href=\'tel:010 47 24 24\'>010 47 24 24</a></font> <br>ou<br> <font size=\' +1\'><a href=\'tel:02 764 93 93\'>02 764 93 93</a></font> <br>(Woluwe - St Gilles - Tournai)<br> ou <br><font size=\' +1\'><a href=\'tel:065 32 35 55\'>065 32 35 55</a></font> (Mons)</p> <p><strong>Contact:</strong> <a href=\'mailto:security@uclouvain.be\'>security@uclouvain.be</a></p> <p><strong>'
      + out + ':</strong> <font size=\' +1\'><a href=\'tel:112\'>112</a></font></p>  <p> <br>' + msg3
      + ' <br><br> <strong>' + msg4 + '</strong> ' + msg5 + '<br> <strong>' + msg6 + '</strong> ' + msg7
      + '<br> <strong>' + msg8 + '</strong> ' + msg9 + '<br>',

      cssClass: 'emergency',
      buttons: [
      {
        text:close,
        handler:data => {
        }
      }]
    }).then(alert => alert.present());
  }

}

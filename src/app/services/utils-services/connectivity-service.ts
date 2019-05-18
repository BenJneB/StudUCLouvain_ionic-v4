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
import { Injectable } from '@angular/core';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

declare var Connection: any;

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {
  onDevice: boolean;
  available: boolean;
  enable: boolean;
  constructor(public platform: Platform,
              private network: Network,
              private translateService: TranslateService,
              private alertCtrl: AlertController,
              private diagnostic: Diagnostic) {
    this.onDevice = this.platform.is('cordova');
  }

  /*Check if there is a connexion*/
  isOnline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type !== Connection.NONE;
    } else {
      return navigator.onLine;
    }
  }
  /*pop up an alert to say to the user to connect him to the internet*/
  presentConnectionAlert() {
    let title: string;
    let message: string;
    let close: string;
    this.translateService.get('NET.TITLE').subscribe((res: string) => {title = res; });
    this.translateService.get('NET.CONNECT').subscribe((res: string) => {message = res; });
    this.translateService.get('NET.CLOSE').subscribe((res: string) => {close = res; });
    let alert = this.alertCtrl.create({
      header: title,
      subHeader: message,
      buttons: [close]
    }).then(alert => alert.present());
  }

    successCallback = (isAvailable) => {
                      this.available = isAvailable;
                      return isAvailable;
                    };

    errorCallback = (e) => console.error(e);

   async isLocationEnabled() {

    await this.diagnostic.isLocationAvailable().then(this.successCallback).catch(this.errorCallback);
    return this.available;
  }



}

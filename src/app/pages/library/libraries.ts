import { CacheService } from 'ionic-cache';
import { UtilsService } from 'src/app/services/utils-services/utils-services';

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
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';

import { LibraryItem } from '../../entity/libraryItem';
import { ConnectivityService } from '../../services/utils-services/connectivity-service';
import { LibrariesService } from '../../services/wso2-services/libraries-service';

@Component({
  selector: 'page-libraries',
  templateUrl: 'libraries.html'
})
export class LibrariesPage {
  title: any;
  libraries: LibraryItem[];
  searching = false;

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public libService: LibrariesService,
    public connService: ConnectivityService,
    private cache: CacheService,
    private utilsServices: UtilsService,
  ) {
    this.cachedOrNot();
    this.title = 'Bibliothèques';
  }

  /*Reload the libraries if we refresh the page*/
  public doRefresh(refresher) {
    this.utilsServices.doRefresh(refresher, 'cache-libraries', this.loadLibraries.bind(this));
  }

  /*Load libraries*/
  loadLibraries(key?) {
    this.searching = true;
    // Check the connexion, if it's ok => load the data else go back to the previous page and pop an alert
    if (this.connService.isOnline()) {
      this.libService.loadLibraries().then(
        res => {
          const result: any = res;
          this.libraries = result.libraries;
          if (key) { this.cache.saveItem(key, this.libraries); }
          this.searching = false;
        }
      );
    } else {
      this.searching = false;
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  /*Open the page with the details for the selectionned library*/
  goToLibDetails(lib: LibraryItem) {
    this.utilsServices.goToDetail(lib, 'libraries/details');
  }

  async cachedOrNot() {
    //  this.cache.removeItem('cache-event');
    const key = 'cache-libraries';
    await this.cache.getItem(key)
      .then((data) => {
        this.libraries = data;
        this.searching = false;
      })
      .catch(() => {
        this.loadLibraries(key);
      });
  }
}

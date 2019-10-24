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
import { NavController } from '@ionic/angular';

import { LibraryItem } from 'src/app/entities/libraryItem';
import { ConnectivityService } from 'src/app/services/utils-services/connectivity-service';
import { LibrariesService } from 'src/app/services/wso2-services/libraries-service';

@Component({
  selector: 'page-libraries',
  templateUrl: 'libraries.html',
  styleUrls: ['./libraries.scss'],
})
export class LibrariesPage {
  title: any;
  libraries: LibraryItem[];
  searching = false;

  constructor(
    public navCtrl: NavController,
    public libService: LibrariesService,
    public connService: ConnectivityService,
    private cache: CacheService,
    private utilsServices: UtilsService,
  ) {
    this.cachedOrNot();
    this.title = 'Bibliothèques';
  }

  public doRefresh(refresher) {
    this.utilsServices.doRefresh(refresher, 'cache-libraries', this.loadLibraries.bind(this));
  }

  loadLibraries(key?: any) {
    this.searching = true;
    if (this.connService.isOnline()) {
      this.libService.loadLibraries().then(
        res => {
          const result: any = res;
          this.libraries = result.libraries;
          if (key !== undefined) { this.cache.saveItem(key, this.libraries); }
          this.searching = false;
        }
      );
    } else {
      this.searching = false;
      this.navCtrl.pop();
      this.connService.presentConnectionAlert();
    }
  }

  goToLibDetails(lib: LibraryItem) {
    this.utilsServices.goToDetail(lib, 'libraries/details');
  }

  cachedOrNot() {
    //  this.cache.removeItem('cache-event');
    const key = 'cache-libraries';
    this.cache.getItem(key)
      .then((data) => {
        this.libraries = data;
        this.searching = false;
      })
      .catch(() => {
        this.loadLibraries(key);
      });
  }
}

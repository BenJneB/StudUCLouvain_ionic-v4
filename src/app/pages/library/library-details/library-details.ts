import { UtilsService } from './../../../services/utils-services/utils-services';
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

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { LibrariesService } from '../../../services/wso2-services/libraries-service';
import { ConnectivityService } from '../../../services/utils-services/connectivity-service';

import { LibraryItem } from '../../../entity/libraryItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'page-library-details',
  templateUrl: 'library-details.html',
  animations: [
    trigger('expand', [
      state('true', style({ height: '45px' })),
      state('false', style({ height: '0'})),
      transition('void => *', animate('0s')),
      transition('* <=> *', animate('250ms ease-in-out'))
    ])
  ]
})

export class LibraryDetailsPage {
  libDetails: LibraryItem;
  shownGroup = null;
  searching = false;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    public libService: LibrariesService,
    public connService: ConnectivityService,
    private utilsServices: UtilsService
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          console.log(this.router.getCurrentNavigation().extras.state);
          this.libDetails = this.router.getCurrentNavigation().extras.state.lib;
          console.log(this.libDetails);
          this.searching = true;
          if (this.connService.isOnline()) {
            this.libService.loadLibDetails(this.libDetails).then(
              res => {
                const result: any = res;
                this.libDetails = result.libDetails;
                this.searching = false;
              }
            );
          } else {
            this.searching = false;
            this.connService.presentConnectionAlert();
          }
        }
      });
  }

  /*Open the page of the library for more details*/
  openPage(url: string) {
    window.open(url, '_blank');
  }
}
